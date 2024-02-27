import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function ViewUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [user]);

  const deleteUserInformation = async () => {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid));
      alert("User information deleted successfully!");
      setUserInfo({});
    }
  };

  const navigateToUpdateUser = () => { 
    navigate('/user/edit');
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading user information...</p>
      ) : userInfo.dateOfBirth ? (
        <div>
          <h2>User Information</h2>
          <p>Full Name: {userInfo.fullName}</p>
          <p>Date of Birth: {userInfo.dateOfBirth}</p>
          <p>Starting Weight: {userInfo.startingWeight}</p>
          <p>Height: {userInfo.height}</p>
          <button onClick={deleteUserInformation}>Delete My Information</button>
          <button onClick={navigateToUpdateUser}>Update My Information</button> 
        </div>
      ) : null}
    </div>
  );
}

export default ViewUserInfo;
