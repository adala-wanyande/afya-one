import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config'; // Ensure you import your Firebase auth instance

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on new submission
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/user/setup'); // Redirect to /user/setup route upon successful signup
    } catch (error) {
      console.error('Failed to sign up:', error);
      handleSignUpError(error); // Handle sign up errors
    }
  };

  const handleSignUpError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setError('The email address is already in use by another account.');
        break;
      case 'auth/invalid-email':
        setError('The email address is not valid.');
        break;
      case 'auth/operation-not-allowed':
        setError('Email/password accounts are not enabled. Contact support.');
        break;
      case 'auth/weak-password':
        setError('The password is too weak. Password should have at least 6 characters.');
        break;
      default:
        setError('Failed to sign up. Please try again later.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign in here</Link>.
      </p>
    </div>
  );
}

export default SignUpForm;
