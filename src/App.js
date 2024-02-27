import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase-config';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CreateUserInfoForm from './pages/user/CreateUserInfo';
import ViewUserInfo from './pages/user/ViewUserInfo';
import UpdateUserInfo from './pages/user/UpdateUserInfo';
import NavBar from './components/navigation/NavBar'; // Adjust the import path according to your project structure

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const Layout = ({ children }) => {
    const location = useLocation();
    const authRoutes = ['/signin', '/signup'];
    const showNavBar = isAuthenticated && !authRoutes.includes(location.pathname);

    return (
      <>
        {showNavBar && <NavBar />}
        <div>{children}</div>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={isAuthenticated ? <ViewUserInfo /> : <Navigate to="/signin" />} />
          <Route path="/user/setup" element={isAuthenticated ? <CreateUserInfoForm /> : <Navigate to="/signin" />} />
          <Route path="/user/edit" element={isAuthenticated ? <UpdateUserInfo /> : <Navigate to="/signin" />} />
          {/* Add more authenticated routes as needed */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
