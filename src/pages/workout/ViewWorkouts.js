import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

function ViewWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc"); 

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (user) {
        const workoutsQuery = query(
          collection(db, "workouts"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(workoutsQuery);
        const fetchedWorkouts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Ensure the date is a Date object for sorting
          date: new Date(doc.data().date),
        }));
        setWorkouts(fetchedWorkouts);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const sortedWorkouts = workouts.sort((a, b) => {
    if (sortOrder === "desc") {
      return b.date - a.date; 
    } else {
      return a.date - b.date; 
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-8 lg:mx-32 relative overflow-x-auto sm:rounded-lg bg-white dark:bg-gray-800">
      <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
        My Workouts
      </h2>
      <div className="flex justify-end">
        <button
          className="px-3 py-1 bg-[#C62828] text-white rounded hover:bg-[#B34040] transition-colors"
          onClick={toggleSortOrder}
        >
          Sort by Date: {sortOrder === "desc" ? "Oldest First" : "Newest First"}
          <ArrowUpDown className="inline-block ml-2 h-4 w-4" />
        </button>
      </div>
      {sortedWorkouts.length > 0 ? (
        <ol className="text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
          {sortedWorkouts.map((workout) => (
            <li key={workout.id} className="mb-2">
              <h3 className="lg:scroll-m-20 text-xl font-semibold tracking-tight text-[#C62828]">
                {format(workout.date, "MMMM dd, yyyy")} - {workout.bodyPart}
              </h3>
              {workout.workouts && workout.workouts.length > 0 ? (
                <ol className="list-decimal divide-y divide-y-8">
                  {workout.workouts.map((exercise, index) => (
                    <li
                      key={index}
                      className="py-4 flex flex-col divide-y divide-y-1"
                    >
                      <p className="py-1 font-medium text-gray-900 dark:text-white text-[#F08080]">
                        {exercise.name}
                      </p>
                      <p className="py-1">Weight: {exercise.weight} kg</p>
                      <p className="py-1">Reps: {exercise.reps} reps</p>
                      <p className="py-1">Sets: {exercise.sets} sets</p>
                      <p className="py-1">
                        Next Target Weight: {exercise.nextWeight} kg
                      </p>
                      <p className="py-1">
                        Next Target Reps: {exercise.nextReps} reps
                      </p>
                      <p className="py-1">
                        Next Target Sets: {exercise.nextSets} sets
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No exercises found for this workout.
                </p>
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