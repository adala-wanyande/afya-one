import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

function ViewUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Show loading indicator while fetching data
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setIsLoading(false); // Hide loading indicator after fetch
    };

    fetchUserData();
  }, [user]); // Run useEffect only when user changes

  const deleteUserInformation = async () => {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid));
      alert("User information deleted successfully!");
      setUserInfo({}); // Reset user info state
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading user information...</p> // Show loading message
      ) : userInfo.dateOfBirth && ( // Render data only when available
        <div>
          <h2>User Information</h2>
          <p>Full Name: {userInfo.fullName}</p>
          <p>Date of Birth: {userInfo.dateOfBirth}</p>
          <p>Starting Weight: {userInfo.startingWeight}</p>
          <p>Height: {userInfo.height}</p>
          <button onClick={deleteUserInformation}>Delete My Information</button>
        </div>
      )}
    </div>
  );
}

export default ViewUserInfo;