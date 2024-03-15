import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "../../components/navigation/NavBar";

const UpdateWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log("No user authenticated. Redirecting...");
        navigate("/signin");
      }
    });

    const fetchWorkoutDetails = async () => {
      const docRef = doc(db, "workouts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkoutDetails({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    if (user) {
      fetchWorkoutDetails();
    }

    return unsubscribe;
  }, [id, navigate, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to update workouts.");
      return;
    }

    const workoutRef = doc(db, "workouts", id);
    try {
      await updateDoc(workoutRef, {
        ...workoutDetails,
        date: workoutDetails.date,
      });
      navigate("/workout/all");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null && field !== null) {
      const updatedWorkouts = [...workoutDetails.workouts];
      updatedWorkouts[index] = { ...updatedWorkouts[index], [field]: value };
      setWorkoutDetails({ ...workoutDetails, workouts: updatedWorkouts });
    } else {
      setWorkoutDetails({
        ...workoutDetails,
        [name]: value,
      });
    }
  };

  if (!workoutDetails)
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

  return (
    <>
      <NavBar></NavBar>
      <div className="mx-8 lg:mx-32 relative overflow-x-auto sm:rounded-lg bg-white dark:bg-gray-800 mb-8">
        <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Edit Workout
        </h2>
        <form onSubmit={handleUpdate} className="mt-4 mx-8">
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Date:
              <input
                type="date"
                name="date"
                id="date"
                value={workoutDetails.date}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </label>
          </div>
          <div className="mb-5">
            <label
              htmlFor="bodyPart"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Body Part:
              <input
                type="text"
                name="bodyPart"
                id="bodyPart"
                value={workoutDetails.bodyPart}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </label>
          </div>
          {workoutDetails.workouts.map((workout, index) => (
            <div key={index} className="mb-5">
              <h3 className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Exercise {index + 1}
              </h3>
              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Exercise Name:{" "}
              </label>

              <input
                type="text"
                name="name"
                placeholder="Workout Name"
                value={workout.name}
                onChange={(e) => handleInputChange(e, index, "name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <label
                htmlFor="weight"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Weight:{" "}
              </label>

              <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={workout.weight}
                onChange={(e) => handleInputChange(e, index, "weight")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <label
                htmlFor="reps"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Reps:{" "}
              </label>

              <input
                type="number"
                name="reps"
                placeholder="Reps"
                value={workout.reps}
                onChange={(e) => handleInputChange(e, index, "reps")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <label
                htmlFor="sets"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Sets:{" "}
              </label>

              <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={workout.sets}
                onChange={(e) => handleInputChange(e, index, "sets")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />

              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Next Target Weight:{" "}
              </label>

              <input
                type="number"
                name="nextWeight"
                placeholder="Next Weight (lbs/kg)"
                value={workout.nextWeight}
                onChange={(e) => handleInputChange(e, index, "nextWeight")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />

              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Next Target Reps:{" "}
              </label>

              <input
                type="number"
                name="nextReps"
                placeholder="Next Reps"
                value={workout.nextReps}
                onChange={(e) => handleInputChange(e, index, "nextReps")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />

              <label
                htmlFor="name"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Next Target Sets:{" "}
              </label>

              <input
                type="text"
                name="nextSets"
                placeholder="Next Sets"
                value={workout.nextSets}
                onChange={(e) => handleInputChange(e, index, "nextSets")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />

              {/* Optionally, you could add a button to remove a workout, styled similarly to your template */}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-5 text-white bg-[#C72929] hover:bg-[#B34040] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateWorkout;
