import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ViewWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (user) {
        const workoutsQuery = query(collection(db, "workouts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(workoutsQuery);
        const fetchedWorkouts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(fetchedWorkouts);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <div>Loading workouts...</div>;
  }

  return (
    <div>
      <h2>My Workouts</h2>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <p>Date: {workout.date}</p>
              {workout.workouts && workout.workouts.length > 0 ? (
                <ul>
                  {workout.workouts.map((exercise, index) => (
                    <li key={index}>
                      <p>Name: {exercise.name}</p>
                      <p>Weight: {exercise.weight}</p>
                      <p>Reps: {exercise.reps}</p>
                      <p>Sets: {exercise.sets}</p>
                      <p>Next Target Weight: {exercise.nextWeight}</p>
                      <p>Next Target Reps: {exercise.nextReps}</p>
                      <p>Next Target Sets: {exercise.nextSets}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No exercises found for this workout.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
}

export default ViewWorkouts;
