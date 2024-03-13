import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../../components/forms/DatePicker';
import { Button } from "../../components/ui/button";

function UpdateUserInfo() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    startingWeight: '',
    height: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // New state to control the visibility of the success alert
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setIsLoading(true);
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...userInfo
      });
      setShowSuccessAlert(true); // Show the success alert
      setTimeout(() => setShowSuccessAlert(false), 4000); // Hide the alert after 5 seconds
      navigate('/user/'); // Consider navigating after showing the alert or based on user action
    }
  };

  // New function to handle decrement
  const handleHeightDecrement = () => {
    setUserInfo(prevState => ({
      ...prevState,
      height: String(Math.max(0, Number(prevState.height) - 0.5)) // Prevents negative values, adjust as needed
    }));
  };

  // New function to handle increment
  const handleHeightIncrement = () => {
    setUserInfo(prevState => ({
      ...prevState,
      height: String(Number(prevState.height) + 0.5)
    }));
  };

  const handleWeightDecrement = () => {
    setUserInfo(prevState => ({
      ...prevState,
      startingWeight: String(Math.max(0, Number(prevState.startingWeight) - 0.5)) // Prevents negative values, adjust as needed
    }));
  };

  // Corrected function to handle weight increment
  const handleWeightIncrement = () => {
    setUserInfo(prevState => ({
      ...prevState,
      startingWeight: String(Number(prevState.startingWeight) + 0.5)
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center mt-32'>
          <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
        <h2 className='mx-36 lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-8'>Update your information</h2>
        <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <label for="website-admin" class="block mb-4 text-base font-medium text-gray-900 dark:text-white">Your full name</label>
          <div class="flex mb-4" flex flex-col justify-center>
            <span class="inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
              </svg>
            </span>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleChange} 
              class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green"/>
          </div>
          <label for="counter-input" class="block mb-1 text-base font-medium text-gray-900 dark:text-white">Choose your starting weight (kg):</label>
          <div class="relative flex items-center mb-4 flex justify-center">
              <button type="button" id="decrement-button" onClick={handleWeightDecrement} data-input-counter-decrement="startingWeight" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                  </svg>
              </button>
              <input 
                id="startingWeight"
                name="startingWeight"
                value={userInfo.startingWeight}
                onChange={handleChange}
                type="text" 
                data-input-counter 
                class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-base font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" required />
              <button type="button" id="increment-button" onClick={handleWeightIncrement} data-input-counter-increment="startingWeight" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
          </div>
          <label for="counter-input" class="block mb-1 text-base font-medium text-gray-900 dark:text-white">Choose your starting height (cm):</label>
          <div class="relative flex items-center mb-4 flex justify-center">
              <button type="button" id="decrement-button" onClick={handleHeightDecrement} data-input-counter-decrement="startingHeight" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                  </svg>
              </button>
              <input 
                id="startingHeight"
                name="startingHeight"
                value={userInfo.height}
                onChange={handleChange} 
                data-input-counter 
                class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-base font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" required />
              <button type="button" id="increment-button" onClick={handleHeightIncrement} data-input-counter-increment="startingHeight" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
          </div>
          <label for="counter-input" class="block mb-1 text-base font-medium text-gray-900 dark:text-white">Choose your date of birth:</label>
          <div class='flex justify-center'>
          <DatePicker
            name="dateOfBirth"
            value={userInfo.dateOfBirth}
            onChange={handleChange}
          />
          </div>
          {showSuccessAlert && (
            <div class="p-4 mt-4 mb-4 text-base text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span class="font-medium">Success alert!</span> Your information has been updated successfully.
            </div>
          )}
          <div class="flex justify-evenly mt-8">
            <Button type="submit">Update information</Button>
            <Button variant="destructive">Delete your information</Button>
          </div>
        </form>
        </>
      )}
    </div>
  );
}

export default UpdateUserInfo;
