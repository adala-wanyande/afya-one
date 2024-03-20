import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../../firebase-config'; // Make sure you've initialized auth somewhere in your project

function ViewTrainingSplits() {
  const [trainingSplits, setTrainingSplits] = useState([]);

  useEffect(() => {
    const fetchTrainingSplits = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "trainingSplits"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const splits = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(splits);
        setTrainingSplits(splits);
      }
    };

    fetchTrainingSplits();
  }, []);

  return (
    <div>
      {trainingSplits.length > 0 ? (
        trainingSplits.map((trainingSplit) => (
          <div key={trainingSplit.id}>
            {trainingSplit.splits.map((split, index) => (
              <div key={index}>
                <h2>{split.day}</h2>
                <p>Focus: {split.focus}</p>
                <h3>Workouts</h3>
                {split.workouts.map((workout, workoutIndex) => (
                  <div key={workoutIndex}>
                    <p>{workout.name} - Reps: {workout.reps}, Sets: {workout.sets}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No training splits found. Please create a new training split.</p>
      )}
    </div>
  );
}

export default ViewTrainingSplits;