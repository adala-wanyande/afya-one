import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/buttons/LoadingButton";
import NavBar from "../../components/navigation/NavBar";

function CreateTrainingSplit() {
  const [splitName, setSplitName] = useState("");
  const [trainingDays, setTrainingDays] = useState([{ name: "", exercises: [{ name: "", reps: "", sets: "" }] }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  const addTrainingDay = () => {
    setTrainingDays([...trainingDays, { name: "", exercises: [{ name: "", reps: "", sets: "" }] }]);
  };

  const removeTrainingDay = (index) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays.splice(index, 1);
    setTrainingDays(newTrainingDays);
  };

  const addExercise = (dayIndex) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays[dayIndex].exercises.push({ name: "", reps: "", sets: "" });
    setTrainingDays(newTrainingDays);
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setTrainingDays(newTrainingDays);
  };

  const handleDayChange = (index, event) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays[index][event.target.name] = event.target.value;
    setTrainingDays(newTrainingDays);
  };

  const handleExerciseChange = (dayIndex, exerciseIndex, event) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays[dayIndex].exercises[exerciseIndex][event.target.name] = event.target.value;
    setTrainingDays(newTrainingDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const trainingSplitData = { splitName, trainingDays, userId };

      try {
        await setDoc(doc(collection(db, "trainingSplits")), trainingSplitData);
        alert("Training split saved successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error adding training split: ", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="lg:mx-32 mx-8 mb-8">
        <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Create New Training Split
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 mx-8">
          <div className="mb-5">
            <label
              htmlFor="splitName"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Training Split Name
            </label>
            <input
              type="text"
              id="splitName"
              name="splitName"
              value={splitName}
              onChange={(e) => setSplitName(e.target.value)}
              placeholder="e.g. Push-Pull-Legs, Full Body"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {trainingDays.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-base font-medium text-gray-900 dark:text-white">
                  Training Day {dayIndex + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeTrainingDay(dayIndex)}
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-3 py-1 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Remove Day
                </button>
              </div>
              <input
                type="text"
                name="name"
                value={day.name}
                onChange={(event) => handleDayChange(dayIndex, event)}
                placeholder="e.g. Leg Day, Upper Body"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                required
              />
              {day.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-base font-medium text-gray-900 dark:text-white">
                      Exercise {exerciseIndex + 1}
                    </label>
                    <button
                      type="button"
                      onClick={() => removeExercise(dayIndex, exerciseIndex)}
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-3 py-1 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Remove Exercise
                    </button>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={exercise.name}
                    onChange={(event) => handleExerciseChange(dayIndex, exerciseIndex, event)}
                    placeholder="Exercise Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                    required
                  />
                  <input
                    type="number"
                    name="reps"
                    value={exercise.reps}
                    onChange={(event) => handleExerciseChange(dayIndex, exerciseIndex, event)}
                    placeholder="Reps"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  />
                  <input
                    type="number"
                    name="sets"
                    value={exercise.sets}
                    onChange={(event) => handleExerciseChange(dayIndex, exerciseIndex, event)}
                    placeholder="Sets"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => addExercise(dayIndex)}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  + Add another exercise to the day
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              className="mt-4 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={addTrainingDay}
            >
              + Add another training day
            </button>
          </div>

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

export default CreateTrainingSplit;
