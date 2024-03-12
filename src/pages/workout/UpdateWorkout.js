import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

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

  if (!workoutDetails) return <div>Loading...</div>;

  return (
    <div className="mx-8 lg:mx-32 relative overflow-x-auto sm:rounded-lg bg-white dark:bg-gray-800">
      <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
        Edit Workout
      </h2>
      <form onSubmit={handleUpdate} className="mt-4 mx-8">
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date:
            <input
              type="date"
              name="date"
              id="date" // Make sure this matches the htmlFor attribute of the label for accessibility
              value={workoutDetails.date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </label>
        </div>
        <div className="mb-5">
          <label
            htmlFor="bodyPart"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Body Part:
            <input
              type="text"
              name="bodyPart"
              id="bodyPart" // Make sure this matches the htmlFor attribute of the label for accessibility
              value={workoutDetails.bodyPart}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </label>
        </div>
        {workoutDetails.workouts.map((workout, index) => (
          <div key={index} className="mb-5">
            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Exercise {index + 1}
            </h3>
            {/* Repeat the input styling for each workout detail (weight, reps, etc.) similarly */}
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Exercise Name:{" "}
            </label>

            <input
              type="text"
              name="name"
              placeholder="Workout Name"
              value={workout.name}
              onChange={(e) => handleInputChange(e, index, "name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <label
              htmlFor="weight"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Weight:{" "}
            </label>

            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={workout.weight}
              onChange={(e) => handleInputChange(e, index, "weight")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <label
              htmlFor="reps"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Reps:{" "}
            </label>

            <input
              type="number"
              name="reps"
              placeholder="Reps"
              value={workout.reps}
              onChange={(e) => handleInputChange(e, index, "reps")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <label
              htmlFor="sets"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sets:{" "}
            </label>

            <input
              type="number"
              name="sets"
              placeholder="Sets"
              value={workout.sets}
              onChange={(e) => handleInputChange(e, index, "sets")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />

            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Next Target Weight:{" "}
            </label>

            <input
              type="number"
              name="nextWeight"
              placeholder="Next Weight (lbs/kg)"
              value={workout.nextWeight}
              onChange={(e) => handleInputChange(e, index, "nextWeight")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />

            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Next Target Reps:{" "}
            </label>

            <input
              type="number"
              name="nextReps"
              placeholder="Next Reps"
              value={workout.nextReps}
              onChange={(e) => handleInputChange(e, index, "nextReps")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />

            {/* Input for nextSets */}
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Next Target Sets:{" "}
            </label>

            <input
              type="text"
              name="nextSets"
              placeholder="Next Sets"
              value={workout.nextSets}
              onChange={(e) => handleInputChange(e, index, "nextSets")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />

            {/* Optionally, you could add a button to remove a workout, styled similarly to your template */}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-5 text-white bg-[#C72929] hover:bg-[#B34040] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorkout;