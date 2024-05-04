import React, { useState } from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/buttons/LoadingButton";
import NavBar from "../../components/navigation/NavBar";

function CreateNutritionEntry() {
  const [date, setDate] = useState("");
  const [meals, setMeals] = useState([
    { mealName: "", carb: "", protein: "", veggies: "", beverage: "" },
  ]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

  const addMealField = () => {
    setMeals([
      ...meals,
      { mealName: "", carb: "", protein: "", veggies: "", beverage: "" },
    ]);
  };

  const removeMealField = (index) => {
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setMeals(newMeals);
  };

  const handleMealChange = (index, event) => {
    const newMeals = [...meals];
    newMeals[index][event.target.name] = event.target.value;
    setMeals(newMeals);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission, disable the button
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const nutritionData = { date, meals, userId };

      try {
        await setDoc(
          doc(db, "nutrition", `${userId}_${Date.now()}`),
          nutritionData
        );
        alert("Nutrition entry saved successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error adding nutrition data: ", error);
        setIsSubmitting(false); // In case of error, re-enable the button
      }
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="lg:mx-32 mx-8 mb-8">
        <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-4">
          Add New Nutrition Entry
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 mx-8">
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {meals.map((meal, index) => (
            <div key={index} className="mb-5">
              <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Meal {index + 1}
              </label>
              <input
                type="text"
                name="mealName"
                value={meal.mealName}
                onChange={(event) => handleMealChange(index, event)}
                placeholder="Meal name e.g Breakfast, Lunch"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                required
              />
              <input
                type="text"
                name="carb"
                value={meal.carb}
                onChange={(event) => handleMealChange(index, event)}
                placeholder="Carb/Starch"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <input
                type="text"
                name="protein"
                value={meal.protein}
                onChange={(event) => handleMealChange(index, event)}
                placeholder="Protein"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <input
                type="text"
                name="veggies"
                value={meal.veggies}
                onChange={(event) => handleMealChange(index, event)}
                placeholder="Veggies"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <input
                type="text"
                name="beverage"
                value={meal.beverage}
                onChange={(event) => handleMealChange(index, event)}
                placeholder="Beverage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              />
              <div class="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeMealField(index)}
                  class="text-white bg-[#F07F7F] hover:bg-[#D09E9E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  Remove Meal {index + 1}
                </button>
              </div>
            </div>
          ))}
          <div class="flex justify-center">
            <button
              type="button"
              onClick={addMealField}
              class="mt-4 text-white w-80 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              + Add another meal to the nutrtion entry
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-5 text-white bg-[#C72929] hover:bg-[B34040] w-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              hidden={isSubmitting}
            >
              Save Nutrition Entry
            </button>
            {isSubmitting ? (
              <>
                <LoadingButton></LoadingButton>
              </>
            ) : (
              console.log()
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateNutritionEntry;
