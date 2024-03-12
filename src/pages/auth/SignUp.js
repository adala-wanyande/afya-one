import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config'; // Ensure you import your Firebase auth instance
import { ErrorAlert } from '../../components/alerts/ErrorAlert';

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
    <div class="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} class="rounded-xl border bg-card text-card-foreground shadow">
        <div class="grid justify-items-end">
          <Link class="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 m-2" to="/signin">Login</Link>
        </div>
        <div class="flex flex-col p-6 space-y-1">
            <h3 class="font-semibold tracking-tight text-2xl">Create an account</h3>
            <p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
        </div>
        <div class="p-6 pt-0 grid gap-4">
            <div class="grid gap-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
              <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" type="email" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="grid gap-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Password</label>
              <input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div class="grid gap-2 max-w-60">
              {error && <ErrorAlert>{error}</ErrorAlert>}
            </div>
        </div>
        <div class="flex items-center p-6 pt-0">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">Create account</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
