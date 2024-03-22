import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/buttons/LoadingButton";
import NavBar from "../../components/navigation/NavBar";

function CreateWeight() {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission, show loading indicator
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
        navigate("/dashboard/"); // Redirect after successful submission
      } catch (error) {
        console.error("Error adding weight entry: ", error);
        alert("Failed to add weight entry.");
        setIsSubmitting(false); // Re-enable the button if submission failed
      }
    } else {
      alert("You must be logged in to add a weight entry.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="lg:mx-32 mx-8 mb-8">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Add Weight Entry
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 mx-8 flex flex-col items-center md:flex-row md:items-end"
        >
          <div className="md:mr-4 mb-4 md:mb-0">
            <label
              htmlFor="date"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="md:mr-4 mb-4 md:mb-0">
            <label
              htmlFor="weight"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Weight (kg):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {isSubmitting ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              className="text-white bg-[#C72929] hover:bg-[#B34040] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-6 md:m-0"
            >
              Add Entry
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default CreateWeight;
