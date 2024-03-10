import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateWorkout() {
  const [date, setDate] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [workouts, setWorkouts] = useState([
    {
      name: "",
      weight: "",
      reps: "",
      sets: "",
      nextWeight: "",
      nextReps: "",
      nextSets: "",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  const addWorkoutField = () => {
    setWorkouts([
      ...workouts,
      {
        name: "",
        bodyPart: "",
        weight: "",
        reps: "",
        sets: "",
        nextWeight: "",
        nextReps: "",
        nextSets: "",
      },
    ]);
  };

  const removeWorkoutField = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
  };

  const handleWorkoutChange = (index, event) => {
    const values = [...workouts];
    values[index][event.target.name] = event.target.value;
    setWorkouts(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const workoutData = { date, bodyPart, workouts, userId };

      try {
        await setDoc(
          doc(db, "workouts", `${userId}_${Date.now()}`),
          workoutData,
        );
        alert("Workout information saved successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error adding workout: ", error);
      }
    }
  };

  return (
    <div className="lg:mx-32 mx-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
        Add New Workout
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 mx-8">
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Workout Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Training Day
          </label>
          <input
            type="text"
            name="bodyPart"
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            placeholder="Training Day"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            required
          />
        </div>
        {workouts.map((workout, index) => (
          <div key={index} className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Exercise {index + 1}
            </label>
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Workout Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              required
            />
            {/* Repeat the input styling for each workout detail (weight, reps, etc.) similarly */}
            <input
              type="number"
              name="weight"
              value={workout.weight}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Weight"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <input
              type="number"
              name="reps"
              value={workout.reps}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Reps"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <input
              type="number"
              name="sets"
              value={workout.sets}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Sets"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <input
              type="number"
              name="nextWeight"
              value={workout.nextWeight}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Next Target Weight"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <input
              type="number"
              name="nextReps"
              value={workout.nextReps}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Next Target Reps"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <input
              type="number"
              name="nextSets"
              value={workout.nextSets}
              onChange={(event) => handleWorkoutChange(index, event)}
              placeholder="Next Target Sets"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            <div class="flex justify-end">
              <button
                type="button"
                onClick={() => removeWorkoutField(index)}
                class="text-white bg-[#F07F7F] hover:bg-[#D09E9E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-6 h-6 text-white mr-2"
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
                Remove Exercise {index + 1}
              </button>
            </div>
          </div>
        ))}
        <div class="flex justify-center">
          <button
            type="button"
            class="mt-4 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={addWorkoutField}
          >
            + Add another exercise to the workout
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-5 text-white bg-[#C72929] hover:bg-[B34040] w-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkout;