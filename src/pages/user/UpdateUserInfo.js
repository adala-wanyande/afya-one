import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { DatePickerDemo } from '../../components/forms/DatePicker';
import { Button } from "../../components/ui/button";

function UpdateUserInfo() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    startingWeight: '',
    height: '',
  });
  const [isLoading, setIsLoading] = useState(true);
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
      alert("User information updated successfully!");
      navigate('/user/');
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <h2 className='mx-36 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8 mb-8'>Update your information</h2>
        <form class="max-w-sm mx-auto">
          <label for="website-admin" class="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
          <div class="flex mb-4" flex flex-col justify-center>
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
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
              class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green"/>
          </div>
          <label for="counter-input" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose your starting weight (kg):</label>
          <div class="relative flex items-center mb-4 flex justify-center">
              <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
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
                class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" required />
              <button type="button" id="increment-button" data-input-counter-increment="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
          </div>
          <label for="counter-input" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose your starting height (cm):</label>
          <div class="relative flex items-center mb-4 flex justify-center">
              <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
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
                class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" required />
              <button type="button" id="increment-button" data-input-counter-increment="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
          </div>
          <label for="counter-input" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose your date of birth:</label>
          <div class='flex justify-center'>
            <DatePickerDemo></DatePickerDemo>
          </div>
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