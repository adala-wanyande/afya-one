import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import NavBar from "../../components/navigation/NavBar";

function ViewWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  const deleteWorkout = async (workoutId) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await deleteDoc(doc(db, "workouts", workoutId));
        // Remove the deleted workout from the state to update the UI
        setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
      } catch (error) {
        console.error("Error deleting workout: ", error);
        alert("Failed to delete workout.");
      }
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (user) {
        const workoutsQuery = query(
          collection(db, "workouts"),
          where("userId", "==", user.uid)
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
    <>
      <NavBar></NavBar>
      <div className="mx-8 lg:mx-32 relative overflow-x-auto sm:rounded-lg bg-white dark:bg-gray-800">
        <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Your Workouts
        </h2>
        <div className="flex justify-end">
          <button
            className="px-3 py-1 bg-[#C62828] text-white rounded hover:bg-[#B34040] transition-colors mb-4"
            onClick={toggleSortOrder}
          >
            Sort by Date:{" "}
            {sortOrder === "desc" ? "Oldest First" : "Newest First"}
            <ArrowUpDown className="inline-block ml-2 h-4 w-4" />
          </button>
        </div>
        {sortedWorkouts.length > 0 ? (
          <ol className="text-sm text-left text-gray-500 dark:text-gray-400 mt-4 ">
            {sortedWorkouts.map((workout) => (
              <li key={workout.id} className="mb-2">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <h3 className="lg:scroll-m-20 text-xl font-semibold tracking-tight text-[#C62828]">
                    {format(workout.date, "MMMM dd, yyyy")} - {workout.bodyPart || workout.selectedDay}
                  </h3>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => navigate(`/workout/edit/${workout.id}`)}
                      className="bg-[#FFD700] hover:bg-[#FFE345] text-white p-3 rounded inline-flex items-center h-10"
                    >
                      <svg
                        class="w-6 h-6 text-white dark:text-white mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Edit Workout
                    </button>
                    <button
                      onClick={() => deleteWorkout(workout.id)}
                      className="ml-4 bg-red-500 hover:bg-red-700 text-white p-3 rounded inline-flex items-center h-10"
                    >
                      <svg
                        class="w-6 h-6 text-white mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                      Delete Workout
                    </button>
                  </div>
                </div>
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
    </>
  );
}

export default ViewWorkouts;
