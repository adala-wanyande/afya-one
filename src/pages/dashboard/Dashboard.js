import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-github-contribution-calendar';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');
  const [workoutData, setWorkoutData] = useState({});
  const navigate = useNavigate();

  // Define custom panel colors here, using different shades of gold if desired
  const panelColors = {
    0: '#eeeeee', // Assuming you want to keep the default color for days without contributions
    1: '#FFD700',
    2: '#FFD700',
    3: '#FFD700',
    4: '#FFD700',
    '>4': '#FFD700'
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        
        // Fetch user's first name
        const getUserFirstName = async () => {
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const fullName = userDocSnap.data().fullName;
            const firstName = fullName.split(' ')[0];
            setFirstName(firstName);
          } else {
            console.log('No such document!');
          }
        };

        // Fetch user's workouts and prepare data for the calendar
        const fetchWorkouts = async () => {
          const q = query(collection(db, "workouts"), where("userId", "==", userId));
          const querySnapshot = await getDocs(q);
          const workoutCounts = {}; // { '2024-03-06': 1, '2024-03-07': 2, ... }
          querySnapshot.forEach((doc) => {
            const { date } = doc.data();
            workoutCounts[date] = (workoutCounts[date] || 0) + 1;
          });
          setWorkoutData(workoutCounts);
        };

        getUserFirstName();
        fetchWorkouts();
      } else {
        console.log('User is not signed in.');
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Get the latest date in the workoutData to set as 'until' value
  const dates = Object.keys(workoutData);
  const until = dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : new Date().toISOString().split('T')[0];

  return (
    <>
      <div className='mx-8 lg:mx-36 lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8'>
        {firstName ? <h1>Welcome back, {firstName}!</h1> : <div>Loading...</div>}
      </div>
      <div className='mx-8 lg:mx-36 mt-4'>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your Workout Contribution Graph
        </h3>
      </div>
      <div className='m-8 flex justify-center'>
        <div className=''>
          <Calendar values={workoutData} until={until} panelColors={panelColors}/>
        </div>
      </div>
    </>
    
  );
};

export default Dashboard;
