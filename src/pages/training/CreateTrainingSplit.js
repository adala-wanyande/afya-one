import React, { useState } from "react";
import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase-config";

function CreateTrainingSplit() {
  const [splits, setSplits] = useState([
    {
      day: "Day 1",
      focus: "",
      workouts: [{ name: "", reps: "", sets: "" }],
    },
  ]);

  const handleSplitChange = (index, event) => {
    const updatedSplits = [...splits];
    if (event.target.name === "focus") {
      updatedSplits[index][event.target.name] = event.target.value;
    }
    setSplits(updatedSplits);
  };

  const handleWorkoutChange = (splitIndex, workoutIndex, event) => {
    const updatedSplits = [...splits];
    updatedSplits[splitIndex].workouts[workoutIndex][event.target.name] =
      event.target.value;
    setSplits(updatedSplits);
  };

  const addSplit = () => {
    const newDayNumber = splits.length + 1;
    const newSplit = {
      day: `Day ${newDayNumber}`,
      focus: "",
      workouts: [{ name: "", reps: "", sets: "" }],
    };
    setSplits(splits.concat(newSplit));
  };

  const addWorkout = (splitIndex) => {
    const updatedSplits = [...splits];
    updatedSplits[splitIndex].workouts.push({ name: "", reps: "", sets: "" });
    setSplits(updatedSplits);
  };

  const saveTrainingSplits = async () => {
    const user = auth.currentUser;
    if (user) {
      const splitsRef = collection(db, "trainingSplits");
      const docId = `${user.uid}_${Date.now()}`;
      const docRef = doc(splitsRef, docId);
      await setDoc(docRef, { splits, userId: user.uid });
      alert("Training splits saved successfully.");
    } else {
      alert("You must be logged in to save your training splits.");
    }
  };

  return (
    <div>
      {splits.map((split, splitIndex) => (
        <div key={splitIndex}>
          <label>{split.day}</label>
          <input
            type="text"
            name="focus"
            value={split.focus}
            onChange={(e) => handleSplitChange(splitIndex, e)}
            placeholder="Focus"
          />
          {split.workouts.map((workout, workoutIndex) => (
            <div key={workoutIndex}>
              <input
                type="text"
                name="name"
                value={workout.name}
                onChange={(e) =>
                  handleWorkoutChange(splitIndex, workoutIndex, e)
                }
                placeholder="Workout Name"
              />
              <input
                type="text"
                name="reps"
                value={workout.reps}
                onChange={(e) =>
                  handleWorkoutChange(splitIndex, workoutIndex, e)
                }
                placeholder="Reps"
              />
              <input
                type="text"
                name="sets"
                value={workout.sets}
                onChange={(e) =>
                  handleWorkoutChange(splitIndex, workoutIndex, e)
                }
                placeholder="Sets"
              />
            </div>
          ))}
          <button onClick={() => addWorkout(splitIndex)}>Add Workout</button>
        </div>
      ))}
      <button onClick={addSplit}>Add Day</button>
      <button onClick={saveTrainingSplits}>Save Training Splits</button>
    </div>
  );
}

export default CreateTrainingSplit;
