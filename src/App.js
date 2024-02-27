import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './firebase-config'; // Make sure db is imported
import { doc, getDoc } from 'firebase/firestore';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CreateUserInfoForm from './pages/user/CreateUserInfo';
import ViewUserInfo from './pages/user/ViewUserInfo';
import UpdateUserInfo from './pages/user/UpdateUserInfo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfoExists, setUserInfoExists] = useState(false); // New state to track if user info exists

  useEffect(() => {
    const checkUserInfo = async (user) => {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      setUserInfoExists(docSnap.exists()); // Update state based on if user info exists
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        checkUserInfo(user); // Check if user info exists in Firestore
      } else {
        setIsAuthenticated(false);
        setUserInfoExists(false); // Reset state if no user is authenticated
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={isAuthenticated ? <ViewUserInfo /> : <Navigate to="/signin" />} />
          <Route path="/user/setup" element={isAuthenticated && !userInfoExists ? <CreateUserInfoForm /> : <Navigate to="/user" />} />
          <Route path="/user/edit" element={isAuthenticated ? <UpdateUserInfo /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
