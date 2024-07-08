import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/buttons/LoadingButton";
import NavBar from "../../components/navigation/NavBar";

function CreateWorkout() {
  const [date, setDate] = useState("");
  const [trainingSplits, setTrainingSplits] = useState([]);
  const [selectedSplit, setSelectedSplit] = useState("");
  const [trainingDays, setTrainingDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutOption, setWorkoutOption] = useState("existing");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTrainingSplits = async () => {
      const user = auth.currentUser;
      if (user) {
        const splitsCollection = collection(db, "trainingSplits");
        const splitDocs = await getDocs(splitsCollection);
        const splits = splitDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainingSplits(splits);
      }
    };

    fetchTrainingSplits();
  }, []);

  useEffect(() => {
    if (selectedSplit) {
      const selectedSplitData = trainingSplits.find(
        (split) => split.id === selectedSplit
      );
      if (selectedSplitData) {
        setTrainingDays(selectedSplitData.trainingDays || []);
      }
    } else {
      setTrainingDays([]);
    }
  }, [selectedSplit, trainingSplits]);

  useEffect(() => {
    if (selectedSplit && selectedDay) {
      const selectedSplitData = trainingSplits.find(
        (split) => split.id === selectedSplit
      );
      const selectedDayData = selectedSplitData.trainingDays.find(
        (day) => day.name === selectedDay
      );
      if (selectedDayData) {
        setWorkouts(
          selectedDayData.exercises.map((exercise) => ({
            name: exercise.name,
            reps: exercise.reps,
            sets: exercise.sets,
            weight: "",
            nextWeight: "",
            nextReps: "",
            nextSets: "",
          }))
        );
      }
    } else {
      setWorkouts([
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
    }
  }, [selectedSplit, selectedDay, trainingSplits]);

  const addWorkoutField = () => {
    setWorkouts([
      ...workouts,
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
    setIsSubmitting(true);
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const workoutData = { date, selectedSplit, selectedDay, workouts, userId };

      try {
        await setDoc(
          doc(db, "workouts", `${userId}_${Date.now()}`),
          workoutData
        );
        alert("Workout information saved successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error adding workout: ", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="lg:mx-32 mx-8 mb-8">
        <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Add New Workout
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 mx-8">
          <div className="mb-5">
            <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
              Choose an option
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workoutOption"
                  value="existing"
                  checked={workoutOption === "existing"}
                  onChange={() => setWorkoutOption("existing")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-900 dark:text-white">
                  Select from existing training splits
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workoutOption"
                  value="new"
                  checked={workoutOption === "new"}
                  onChange={() => setWorkoutOption("new")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-900 dark:text-white">
                  Input a completely new workout
                </span>
              </label>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Workout Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          {workoutOption === "existing" && (
            <>
              <div className="mb-5">
                <label
                  htmlFor="split"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Training Split
                </label>
                <select
                  id="split"
                  value={selectedSplit}
                  onChange={(e) => setSelectedSplit(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  required
                >
                  <option value="" disabled>
                    Select a training split
                  </option>
                  {trainingSplits.map((split) => (
                    <option key={split.id} value={split.id}>
                      {split.splitName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="day"
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Training Day
                </label>
                <select
                  id="day"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  required
                  disabled={!selectedSplit}
                >
                  <option value="" disabled>
                    Select a training day
                  </option>
                  {trainingDays.map((day, index) => (
                    <option key={index} value={day.name}>
                      {day.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {workoutOption === "new" &&
            workouts.map((workout, index) => (
              <div key={index} className="mb-5">
                <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Exercise {index + 1}
                </label>
                <input
                  type="text"
                  name="name"
                  value={workout.name}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Exercise Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  required
                />
                <input
                  type="number"
                  name="weight"
                  value={workout.weight}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <input
                  type="number"
                  name="reps"
                  value={workout.reps}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Reps"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <input
                  type="number"
                  name="sets"
                  value={workout.sets}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Sets"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <input
                  type="number"
                  name="nextWeight"
                  value={workout.nextWeight}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Next Target Weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <input
                  type="number"
                  name="nextReps"
                  value={workout.nextReps}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Next Target Reps"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <input
                  type="number"
                  name="nextSets"
                  value={workout.nextSets}
                  onChange={(event) => handleWorkoutChange(index, event)}
                  placeholder="Next Target Sets"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeWorkoutField(index)}
                    className="text-white bg-[#F07F7F] hover:bg-[#D09E9E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-6 h-6 text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                    Remove Exercise {index + 1}
                  </button>
                </div>
              </div>
            ))}

          {workoutOption === "new" && (
            <div className="flex justify-center">
              <button
                type="button"
                className="mt-4 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={addWorkoutField}
              >
                + Add another exercise to the workout
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-5 text-white bg-[#C72929] hover:bg-[#B34040] w-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              hidden={isSubmitting}
            >
              Submit
            </button>
            {isSubmitting && <LoadingButton />}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateWorkout;