import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase-config';
import { ErrorAlert } from '../../components/alerts/ErrorAlert';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    
    setEmailError(isEmailValid ? '' : 'Invalid email format.');

    if (!isEmailValid) {
      return; // Prevent form submission if validation fails
    }

    setError(''); // Reset error message on new submission
    try {
      await sendPasswordResetEmail(auth, email);
      setEmail(''); // Clear input field
      setSuccessMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Error sending password reset email. Please check your email address.'); // Display error message
    }
  };

  return (
    <div className="justify-center flex mt-16">
      <form onSubmit={handleSubmit} className="rounded-xl border bg-card text-card-foreground shadow w-[340px]">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="font-semibold tracking-tight text-2xl">Forgot Password</h3>
          <p className="text-base text-muted-foreground">Enter your email to reset your password</p>
        </div>
        <div className="px-6 py-2 pt-0 grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
            <input className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" type="email" value={email} 
              onChange={(e) => setEmail(e.target.value)} />
            {emailError && <ErrorAlert>{emailError}</ErrorAlert>}
          </div>
          <div className="grid gap-2">
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
          </div>
        </div>
        <div className="flex items-center px-6 py-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">Send Reset Email</button>
        </div>
        <div className="flex justify-end mx-8 pb-8">
          <Link to="/signin" className="text-sm flex items-center hover:underline">Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
