import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';
import { ErrorAlert } from '../../components/alerts/ErrorAlert';
import logo from "../../assets/images/afya-one-logo.jpg";

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/user/setup');
    } catch (error) {
      console.error('Failed to sign up:', error);
      handleSignUpError(error);
    }
  };

  const handleSignUpError = (error) => {
    console.log(error)
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
      {/* Header Section */}
      <header className="bg-white text-black py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="grid content-center">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-10 rounded" alt="Afya One Logo" />
            </Link>
          </div>
          <nav>
            <Link to="/signin" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex justify-center mt-16">
        <form onSubmit={handleSubmit} className="rounded-lg border bg-white text-black shadow-md w-full max-w-md">
          <div className="flex flex-col p-6 space-y-3">
            <h3 className="font-semibold tracking-tight text-2xl">Create an account</h3>
            <p className="text-base text-gray-600">Enter your email below to create your account</p>
          </div>
          <div className="px-6 py-2 pt-0 grid gap-4">
            <div className="grid gap-2">
              <label className="text-base font-medium" htmlFor="email">Email</label>
              <input
                className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
                id="email" 
                placeholder="email@example.com" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-base font-medium" htmlFor="password">Password</label>
              <input
                className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
                id="password" 
                placeholder='●●●●●●' 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-base font-medium" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
                id="confirmPassword" 
                placeholder='●●●●●●' 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              {error && <ErrorAlert>{error}</ErrorAlert>}
            </div>
          </div>
          <div className="flex items-center px-6 py-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition bg-red-500 text-white shadow hover:bg-red-600 h-10 px-4 py-2 w-full">
              Create account
            </button>
          </div>
          <div className="flex justify-end mx-8 pt-2 pb-8">
            <span className='text-sm flex items-center'>Already have an account?</span>
            <Link className="ml-2 whitespace-nowrap rounded-md text-sm font-medium transition hover:text-red-500" to="/signin">
              <span className='hover:underline'>Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;