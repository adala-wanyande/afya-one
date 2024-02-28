import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

function CreateUserInfoForm() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [startingWeight, setStartingWeight] = useState('');
  const [height, setHeight] = useState('');
  const navigate = useNavigate();
  const [shouldRenderForm, setShouldRenderForm] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          alert('User information already exists.');
          navigate('/user/');
        } else {
          // Only render form if no user information exists
          setShouldRenderForm(true);
        }
      } else {
        // If not authenticated, redirect to sign-in page
        navigate('/signin');
      }
    };

    checkUserInfo();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userInfo = { fullName, dateOfBirth, startingWeight, height };

      try {
        await setDoc(doc(db, 'users', userId), userInfo);
        alert('User information saved successfully!');
        navigate('/user/');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  if (!shouldRenderForm) {
    // Optionally render nothing or a loader
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <input
        type="number"
        value={startingWeight}
        onChange={(e) => setStartingWeight(e.target.value)}
        placeholder="Starting Weight"
        required
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateUserInfoForm;
