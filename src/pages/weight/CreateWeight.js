import React, { useState } from "react";
import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebase-config";

function CreateWeight() {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const docId = `${user.uid}_${Date.now()}`;
      try {
        await setDoc(doc(db, "weights", docId), {
          userId: user.uid,
          weight: Number(weight),
          date: new Date(date),
        });
        alert("Weight entry added successfully!");
        // Reset form fields after successful submission
        setWeight("");
        setDate("");
      } catch (error) {
        console.error("Error adding weight entry: ", error);
        alert("Failed to add weight entry.");
      }
    } else {
      alert("You must be logged in to add a weight entry.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Weight Entry</h2>
      <div>
        <label htmlFor="weight">Weight (kg): </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default CreateWeight;
