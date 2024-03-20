import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase-config"; // Ensure auth is initialized

function ViewWeights() {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "weights"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userWeights = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWeights(userWeights);
      }
    };

    fetchWeights();
  }, []);

  // Formatting the date for display
  const formatDate = (date) => {
    if (!date) return "";
    const d = date.toDate(); // Convert Firestore Timestamp to JavaScript Date object
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div>
      <h2>My Weight Entries</h2>
      {weights.length > 0 ? (
        <ul>
          {weights.map((weightEntry) => (
            <li key={weightEntry.id}>
              <p>Weight: {weightEntry.weight} kg</p>
              <p>Date: {formatDate(weightEntry.date)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No weight entries found.</p>
      )}
    </div>
  );
}

export default ViewWeights;
