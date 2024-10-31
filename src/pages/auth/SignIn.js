import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';
import { ErrorAlert } from '../../components/alerts/ErrorAlert';
import logo from "../../assets/images/afya-one-logo.jpg";

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    setEmailError(isEmailValid ? '' : 'Invalid email format.');
    setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters.');

    if (!isEmailValid || !isPasswordValid) {
      return; 
    }

    setError(''); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Failed to sign in:', error);
      setError('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-white text-black py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="grid content-center">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-10 rounded" alt="Afya One Logo" />
            </Link>
          </div>
          <nav>
            <Link to="/signup" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex justify-center mt-16 mx-8">
        <form onSubmit={handleSubmit} className="rounded-lg border bg-white text-black shadow-md w-full max-w-md">
          <div className="flex flex-col p-6 space-y-3">
            <h3 className="font-semibold tracking-tight text-2xl">Sign in to your account</h3>
            <p className="text-base text-gray-600">Please enter your details below</p>
          </div>
          <div className="px-6 py-2 pt-0 grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input 
                className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
                id="email" 
                placeholder="email@example.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              {emailError && <ErrorAlert>{emailError}</ErrorAlert>}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <input 
                className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500" 
                id="password" 
                type="password" 
                placeholder="●●●●●●" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              {passwordError && <ErrorAlert>{passwordError}</ErrorAlert>}
            </div>
            <div className="grid gap-2">
              {error && <ErrorAlert>{error}</ErrorAlert>}
            </div>
          </div>
          <div className="flex items-center px-6 py-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition bg-red-500 text-white shadow hover:bg-red-600 h-10 px-4 py-2 w-full">
              Sign in
            </button>
          </div>
          <div className="flex flex-col justify-end mx-8 pt-2 pb-8">
            <Link className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition hover:text-red-500 mb-3" to="/forgot-password">
              <span className='hover:underline'>Forgot Password?</span>
            </Link>
            <div className='text-sm flex items-center'>
              Don't have an account? 
              <Link className="ml-2 whitespace-nowrap rounded-md text-sm font-medium transition hover:text-red-500" to="/signup">
                <span className='hover:underline'>Sign Up</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
