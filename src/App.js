import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase-config';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CreateUserInfoForm from './pages/user/CreateUserInfo';
import ViewUserInfo from './pages/user/ViewUserInfo';
import UpdateUserInfo from './pages/user/UpdateUserInfo';
import NavBar from './components/navigation/NavBar';
import Dashboard from './pages/dashboard/Dashboard';
import CreateWorkout from './pages/workout/CreateWorkout';
import ViewWorkouts from './pages/workout/ViewWorkouts';

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
    return <div className='flex justify-center mt-32'>
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>;
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
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/user/setup" element={isAuthenticated ? <CreateUserInfoForm /> : <Navigate to="/signin" />} />
          <Route path="/user/edit" element={isAuthenticated ? <UpdateUserInfo /> : <Navigate to="/signin" />} />
          <Route path="/workout/new" element={isAuthenticated ? <CreateWorkout /> : <Navigate to="/signin" />} />
          <Route path="/workout/all" element={isAuthenticated ? <ViewWorkouts /> : <Navigate to="/signin" />} />
          {/* Redirect users to the sign-in page by default if they access the root path */}
          <Route path="/" element={<Navigate to="/signin" />} />
          {/* Redirect non-authenticated users to the sign-in page for any other routes */}
          <Route path="*" element={!isAuthenticated ? <Navigate to="/signin" /> : <Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;