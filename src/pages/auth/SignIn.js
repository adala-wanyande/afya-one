import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';
import { ErrorAlert } from '../../components/alerts/ErrorAlert';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Example: Validate password length. Add more criteria as needed.
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    setEmailError(isEmailValid ? '' : 'Invalid email format.');
    setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters.');

    if (!isEmailValid || !isPasswordValid) {
      return; // Prevent form submission if validation fails
    }

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
    <div className="justify-center flex mt-16">
      <form onSubmit={handleSubmit} className="rounded-xl border bg-card text-card-foreground shadow w-[340px]">
        <div className="flex flex-col p-6 space-y-1">
            <h3 className="font-semibold tracking-tight text-2xl">Sign in to your account</h3>
            <p className="text-base text-muted-foreground">Please enter your details below</p>
        </div>
        <div className="px-6 py-2 pt-0 grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
              <input className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" type="email" value={email} 
                onChange={(e) => setEmail(e.target.value)} />
              {emailError && <ErrorAlert>{emailError}</ErrorAlert>}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
              <input className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="password" type="password" placeholder='●●●●●●' value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {passwordError && <ErrorAlert>{passwordError}</ErrorAlert>}
            </div>
            <div className="grid gap-2">
              {error && <ErrorAlert>{error}</ErrorAlert>}
            </div>
        </div>
        <div className="flex items-center px-6 py-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">Sign in</button>
        </div>
        <div className="flex justify-end mx-8 pt-2 pb-8">
          <span className='text-sm flex items-center'>Don't have an account?</span>
          <Link className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground ml-2" to="/signup"><span className='hover:underline'>Sign Up</span></Link>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;