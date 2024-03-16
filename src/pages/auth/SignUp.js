import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';
import { ErrorAlert } from '../../components/alerts/ErrorAlert';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Ensure password is at least 6 characters
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
    <div class="flex justify-center mt-16">
      <form onSubmit={handleSubmit} class="rounded-xl border bg-card text-card-foreground shadow w-[340px]">
        <div class="flex flex-col p-6 space-y-1">
            <h3 class="font-semibold tracking-tight text-2xl">Create an account</h3>
            <p class="text-base text-muted-foreground">Enter your email below to create your account</p>
        </div>
        <div class="p-6 pt-0 grid gap-4">
            <div class="grid gap-2">
              <label class="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
              <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" type="email" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="grid gap-2">
              <label class="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Password</label>
              <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="password" placeholder='●●●●●●' type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <label className="text-base font-medium leading-none" htmlFor="confirmPassword">Confirm Password</label>
              <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" id="confirmPassword" placeholder='●●●●●●' type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div class="grid gap-2">
              {error && <ErrorAlert>{error}</ErrorAlert>}
            </div>
        </div>
        <div class="flex items-center p-6 pt-0">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">Create account</button>
        </div>
        <div className="flex justify-end mx-8 pt-2 pb-8">
          <span className='text-sm flex items-center'>Already have an account?</span>
          <Link className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground ml-2" to="/signin"><span className='hover:underline'>Sign In</span></Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
