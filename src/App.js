import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase-config'; // Adjust the import path according to your project structure

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CreateUserInfoForm from './pages/user/CreateUserInfo';
import ViewUserInfo from './pages/user/ViewUserInfo';
import UpdateUserInfo from './pages/user/UpdateUserInfo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To handle the loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={isAuthenticated ? <ViewUserInfo /> : <Navigate to="/signin" />} />
          <Route path="/user/setup" element={isAuthenticated ? <CreateUserInfoForm /> : <Navigate to="/signin" />} />
          <Route path="/user/edit" element={isAuthenticated ? <UpdateUserInfo /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;