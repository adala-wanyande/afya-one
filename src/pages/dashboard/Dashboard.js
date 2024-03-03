import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        const getUserFirstName = async () => {
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const fullName = userDocSnap.data().fullName;
            const firstName = fullName.split(' ')[0];
            setFirstName(firstName);
          } else {
            console.log('No such document!');
          }
        };

        getUserFirstName();
      } else {
        console.log('User is not signed in.');
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {firstName ? <h1>Welcome back, {firstName}!</h1> : <h1>Loading...</h1>}
    </div>
  );
};

export default Dashboard;
