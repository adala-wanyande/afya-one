import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { format } from "date-fns";
import NavBar from "../../components/navigation/NavBar";

function ViewNutrition() {
  const [nutritionEntries, setNutritionEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  const deleteNutritionEntry = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this nutrition entry?")) {
      try {
        await deleteDoc(doc(db, "nutrition", entryId));
        setNutritionEntries(nutritionEntries.filter(entry => entry.id !== entryId));
      } catch (error) {
        console.error("Error deleting nutrition entry: ", error);
        alert("Failed to delete nutrition entry.");
      }
    }
  };

  useEffect(() => {
    const fetchNutritionEntries = async () => {
      const user = auth.currentUser;
      if (user) {
        const nutritionQuery = query(
          collection(db, "nutrition"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(nutritionQuery);
        const fetchedEntries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date) // assuming date is stored
        }));
        setNutritionEntries(fetchedEntries);
        setLoading(false);
      }
    };

    fetchNutritionEntries();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === "desc" ? "asc" : "desc");
  };

  const sortedEntries = nutritionEntries.sort((a, b) => {
    if (sortOrder === "desc") {
      return b.date - a.date;
    } else {
      return a.date - b.date;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        {/* Loading Spinner */}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="mx-8 lg:mx-32 overflow-x-auto sm:rounded-lg bg-white dark:bg-gray-800">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight mb-4">
          Your Nutrition Entries
        </h2>
        <div className="flex justify-end">
          <button className="px-3 py-1 bg-[#C62828] text-white rounded hover:bg-[#B34040] transition-colors mb-4"
            onClick={toggleSortOrder}>
            Sort by Date: {sortOrder === "desc" ? "Oldest First" : "Newest First"}
          </button>
        </div>
        {sortedEntries.length > 0 ? (
          <ol>
            {sortedEntries.length > 0 ? (
  <ol>
    {sortedEntries.map((entry) => (
      <li key={entry.id} className="mb-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-xl font-semibold tracking-tight">
            {format(entry.date, "MMMM dd, yyyy")}
          </h3>
          <div className="flex items-center mt-4">
            <button onClick={() => navigate(`/nutrition/edit/${entry.id}`)}>
              Edit Entry
            </button>
            <button onClick={() => deleteNutritionEntry(entry.id)}>
              Delete Entry
            </button>
          </div>
        </div>
        {entry.meals && entry.meals.length > 0 ? (
          <ol className="list-decimal">
            {entry.meals.map((meal, index) => (
              <li key={index} className="py-4 flex flex-col">
                <p className="font-medium text-gray-900">
                  Meal Type: {meal.mealName}
                </p>
                <p>Carbs: {meal.carbs}</p>
                <p>Proteins: {meal.proteins}</p>
                <p>Veggies: {meal.veggies}</p>
                <p>Beverage: {meal.beverage}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No meals recorded for this entry.</p>
        )}
      </li>
    ))}
  </ol>
) : (
  <p className="text-gray-500">No nutrition entries found.</p>
)}

          </ol>
        ) : (
          <p>No nutrition entries found.</p>
        )}
      </div>
    </>
  );
}

export default ViewNutrition;
