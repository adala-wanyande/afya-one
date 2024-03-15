import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';
import { ErrorAlert } from '../../components/alerts/ErrorAlert';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on new submission
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect user to dashboard upon successful sign-in
    } catch (error) {
      console.error('Failed to sign in:', error);
      setError('Failed to sign in. Please check your email and password.'); // Generic error message for sign in failure
    }
  };

  return (
    <div class="justify-center flex mt-16">
      <form onSubmit={handleSubmit} class="rounded-xl border bg-card text-card-foreground shadow w-[340px]">
        <div class="grid justify-items-end">
          <Link class="justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 m-2" to="/signup">Sign Up</Link>
        </div>
        <div class="flex flex-col p-6 space-y-1">
            <h3 class="font-semibold tracking-tight text-2xl">Sign in to your account</h3>
            <p class="text-base text-muted-foreground">Please enter your details below</p>
        </div>
        <div class="p-6 pt-0 grid gap-4">
            <div class="grid gap-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
              <input class="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" type="email" value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="grid gap-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Password</label>
              <input class="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="grid gap-2 max-w-60">
              {error && <ErrorAlert>{error}</ErrorAlert>}
            </div>
        </div>
        <div class="flex items-center p-6 pt-0">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
