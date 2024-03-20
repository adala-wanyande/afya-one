import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase-config'; // Make sure auth is initialized

function UpdateTrainingSplit({ documentId }) {
  const [splits, setSplits] = useState([]);

  useEffect(() => {
    // Fetch the existing training split data
    const fetchTrainingSplit = async () => {
      const docRef = doc(db, "trainingSplits", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSplits(docSnap.data().splits); // Assuming the data structure includes a 'splits' array
      } else {
        console.log("No such document!");
      }
    };

    fetchTrainingSplit();
  }, [documentId]);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      const splitsRef = doc(db, "trainingSplits", documentId);
      await updateDoc(splitsRef, { splits });
      alert('Training split updated successfully.');
    } else {
      alert('You must be logged in to update a training split.');
    }
  };

  // Handler functions to modify the state (splits) would go here
  // For simplicity, those are not included in this example

  return (
    <div>
      {/* Form elements to display and edit the splits would go here */}
      {/* For simplicity, this example does not include the detailed form implementation */}
      <button onClick={handleUpdate}>Update Training Split</button>
    </div>
  );
}

export default UpdateTrainingSplit;
