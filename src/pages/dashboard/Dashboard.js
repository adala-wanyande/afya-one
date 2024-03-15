import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Calendar from "react-github-contribution-calendar";
import NavBar from "../../components/navigation/NavBar";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [workoutData, setWorkoutData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const panelColors = {
    0: "#eeeeee",
    1: "#FFD700",
    2: "#FFD700",
    3: "#FFD700",
    4: "#FFD700",
    ">4": "#FFD700",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const getUserFirstName = async () => {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const fullName = userDocSnap.data().fullName;
            const firstName = fullName.split(" ")[0];
            setFirstName(firstName);
          } else {
            console.log("No such document!");
          }
        };

        const fetchWorkouts = async () => {
          const q = query(
            collection(db, "workouts"),
            where("userId", "==", userId)
          );
          const querySnapshot = await getDocs(q);
          const workoutCounts = {};
          querySnapshot.forEach((doc) => {
            const { date } = doc.data();
            workoutCounts[date] = (workoutCounts[date] || 0) + 1;
          });
          setWorkoutData(workoutCounts);
        };

        getUserFirstName();
        fetchWorkouts();
      } else {
        console.log("User is not signed in.");
        navigate("/signin");
      }
      setIsLoading(false); // Set loading to false after fetching data
    });

    return () => unsubscribe();
  }, [navigate]);

  const dates = Object.keys(workoutData);
  const today = new Date().toISOString().split("T")[0];

  // Show loading text if isLoading is true
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="mx-8 lg:mx-36 lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8">
        <h1>Welcome back, {firstName}!</h1>
      </div>
      <div className="mx-8 lg:mx-36 mt-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your Workout Contribution Graph
        </h3>
      </div>
      <div className="mx-8 lg:mx-36 mt-4 flex justify-center">
        <Calendar
          values={workoutData}
          until={today}
          panelColors={panelColors}
        />
      </div>
    </>
  );
};

export default Dashboard;
