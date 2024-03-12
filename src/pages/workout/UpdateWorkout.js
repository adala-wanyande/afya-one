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
    <form onSubmit={handleUpdate}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={workoutDetails.date}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Body Part:
        <input
          type="text"
          name="bodyPart"
          value={workoutDetails.bodyPart}
          onChange={handleInputChange}
        />
      </label>
      {workoutDetails.workouts.map((workout, index) => (
        <div key={index}>
          <h3>Workout {index + 1}</h3>
          <label>
            Weight:
            <input
              type="text"
              name="weight"
              value={workout.weight}
              onChange={(e) => handleInputChange(e, index, "weight")}
            />
          </label>
          <label>
            Reps:
            <input
              type="text"
              name="reps"
              value={workout.reps}
              onChange={(e) => handleInputChange(e, index, "reps")}
            />
          </label>
          <label>
            Sets:
            <input
              type="text"
              name="sets"
              value={workout.sets}
              onChange={(e) => handleInputChange(e, index, "sets")}
            />
          </label>

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={(e) => handleInputChange(e, index, "name")}
            />
          </label>
          <label>
            Next Reps:
            <input
              type="text"
              name="nextReps"
              value={workout.nextReps}
              onChange={(e) => handleInputChange(e, index, "nextReps")}
            />
          </label>
          <label>
            Next Sets:
            <input
              type="text"
              name="nextSets"
              value={workout.nextSets}
              onChange={(e) => handleInputChange(e, index, "nextSets")}
            />
          </label>
          <label>
            Next Weight:
            <input
              type="text"
              name="nextWeight"
              value={workout.nextWeight}
              onChange={(e) => handleInputChange(e, index, "nextWeight")}
            />
          </label>
        </div>
      ))}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UpdateWorkout;