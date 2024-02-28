import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/user'); 
    } catch (error) {
      console.error('Failed to sign in:', error);
      handleSignInError(error); // Handle login errors
    }
  };

  const handleSignInError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        setError('The email address is not valid.');
        break;
      case 'auth/user-disabled':
        setError('The user corresponding to the given email has been disabled.');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setError('Incorrect email or password.');
        break;
      default:
        setError('Failed to sign in. Please try again later.');
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
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
}

export default SignInForm;