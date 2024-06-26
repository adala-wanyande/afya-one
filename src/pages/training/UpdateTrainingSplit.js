import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../../components/buttons/LoadingButton";
import NavBar from "../../components/navigation/NavBar";

function UpdateTrainingSplit() {
  const { id } = useParams();
  const [splitName, setSplitName] = useState("");
  const [trainingDays, setTrainingDays] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signin");
    } else {
      fetchTrainingSplit(id);
    }
  }, [id, navigate]);

  const fetchTrainingSplit = async (splitId) => {
    try {
      const splitDoc = await getDoc(doc(db, "trainingSplits", splitId));
      if (splitDoc.exists()) {
        const data = splitDoc.data();
        setSplitName(data.splitName);
        setTrainingDays(data.trainingDays);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching training split: ", error);
    }
  };

  const addTrainingDay = () => {
    setTrainingDays([...trainingDays, { name: "", exercises: [{ name: "", reps: "", sets: "" }] }]);
  };

  const addExercise = (dayIndex) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays[dayIndex].exercises.push({ name: "", reps: "", sets: "" });
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

  const removeTrainingDay = (dayIndex) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays.splice(dayIndex, 1);
    setTrainingDays(newTrainingDays);
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const newTrainingDays = [...trainingDays];
    newTrainingDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setTrainingDays(newTrainingDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = auth.currentUser;
    if (user) {
      const trainingSplitData = { splitName, trainingDays, userId: user.uid };

      try {
        await updateDoc(doc(db, "trainingSplits", id), trainingSplitData);
        alert("Training split updated successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error updating training split: ", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="lg:mx-32 mx-8 mb-8">
        <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Update Training Split
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
              <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Training Day {dayIndex + 1}
              </label>
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
                  <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                    Exercise {exerciseIndex + 1}
                  </label>
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
                  <button
                    type="button"
                    onClick={() => removeExercise(dayIndex, exerciseIndex)}
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
                    Remove Exercise {exerciseIndex + 1}
                  </button>
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
                <button
                  type="button"
                  onClick={() => removeTrainingDay(dayIndex)}
                  className="ml-4 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Remove Day
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

export default UpdateTrainingSplit;