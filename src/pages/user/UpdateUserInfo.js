import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function UpdateUserInfo() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    startingWeight: '',
    height: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setIsLoading(true);
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...userInfo
      });
      alert("User information updated successfully!");
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Update User Information</h2>
          
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userInfo.fullName}
            onChange={handleChange}
          />

          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            value={userInfo.dateOfBirth}
            onChange={handleChange}
          />

          <label htmlFor="startingWeight">Starting Weight:</label>
          <input
            type="number"
            id="startingWeight"
            name="startingWeight"
            value={userInfo.startingWeight}
            onChange={handleChange}
          />

          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={userInfo.height}
            onChange={handleChange}
          />

          <button type="submit">Update Information</button>
        </form>
      )}
    </div>
  );
}

export default UpdateUserInfo;
