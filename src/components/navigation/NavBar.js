// NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config'; 

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin'); // Redirect to sign-in page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav>
      <ul>
        <li><a href="/user">View User Info</a></li>
        <li><a href="/user/edit">Edit User Info</a></li>
        <li><button onClick={handleSignOut}>Sign Out</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
