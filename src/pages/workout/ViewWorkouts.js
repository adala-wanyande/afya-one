import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { ArrowUpDown } from "lucide-react";

function ViewWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (user) {
        const workoutsQuery = query(collection(db, "workouts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(workoutsQuery);
        const fetchedWorkouts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure the date is a Date object for sorting
          date: new Date(doc.data().date)
        }));
        setWorkouts(fetchedWorkouts);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "desc" ? "asc" : "desc"));
  };

  // Sort workouts by date based on sortOrder
  const sortedWorkouts = workouts.sort((a, b) => {
    if (sortOrder === "desc") {
      return b.date - a.date; // For descending order
    } else {
      return a.date - b.date; // For ascending order
    }
  });

  if (loading) {
    return <div>Loading workouts...</div>;
  }

  return (
    <div className="mx-64 relative overflow-x-auto sm:rounded-lg p-5 bg-white dark:bg-gray-800">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">My Workouts</h2>
      <div className=''>
        <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
            onClick={toggleSortOrder}
          >
            Sort by Date {sortOrder === "desc" ? "Oldest First" : "Newest First"}
            <ArrowUpDown className="inline-block ml-2 h-4 w-4" />
        </button>
      </div>
      {sortedWorkouts.length > 0 ? (
        <ol className="text-sm text-left text-gray-500 dark:text-gray-400 mt-4 list-decimal ml-5"> {/* Main workouts list */}
          {sortedWorkouts.map((workout) => (
            <li key={workout.id} className="mb-4">
              <p className="font-medium text-gray-900 dark:text-white">
                Date: {format(workout.date, 'MMMM dd, yyyy')}
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                Training Day: {workout.bodyPart}
              </p>
              {workout.workouts && workout.workouts.length > 0 ? (
                <ol className="mt-2 list-decimal ml-5"> {/* Changed from <ul> to <ol> for numbered list of exercises */}
                  {workout.workouts.map((exercise, index) => (
                    <li key={index} className="rounded-lg p-4 mb-2">
                      <p className="font-medium text-gray-900 dark:text-white">Exercise Name: {exercise.name}</p>
                      <p>Weight: {exercise.weight} kg</p>
                      <p>Reps: {exercise.reps} reps</p>
                      <p>Sets: {exercise.sets} sets</p>
                      <p>Next Target Weight: {exercise.nextWeight} kg</p>
                      <p>Next Target Reps: {exercise.nextReps} reps</p>
                      <p>Next Target Sets: {exercise.nextSets} sets</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No exercises found for this workout.</p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No workouts found.</p>
      )}
    </div>
  );
}

export default ViewWorkouts;
