import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateWorkout() {
  const [date, setDate] = useState("");
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
      // If not authenticated, redirect to sign-in page
      navigate("/signin");
    }
  }, [navigate]);

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
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const workoutData = { date, workouts };

      try {
        await setDoc(doc(db, "workouts", userId), workoutData);
        alert("Workout information saved successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error adding workout: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Enter date"
        required
      />
      {workouts.map((workout, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={workout.name}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Workout Name"
            required
          />
          <input
            type="number"
            name="weight"
            value={workout.weight}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Weight"
          />
          <input
            type="number"
            name="reps"
            value={workout.reps}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Reps"
          />
          <input
            type="number"
            name="sets"
            value={workout.sets}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Sets"
          />
          <input
            type="number"
            name="nextWeight"
            value={workout.nextWeight}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Next Target Weight"
          />
          <input
            type="number"
            name="nextReps"
            value={workout.nextReps}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Next Target Reps"
          />
          <input
            type="number"
            name="nextSets"
            value={workout.nextSets}
            onChange={(event) => handleWorkoutChange(index, event)}
            placeholder="Next Target Sets"
          />
          <button type="button" onClick={() => removeWorkoutField(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addWorkoutField}>
        Add Workout
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateWorkout;
