import React from 'react';
import { signOutUser } from '../../functions/auth';

function SignOutButton() {
  const handleSignOut = async () => {
    await signOutUser();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOutButton;
