import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import {
  format,
  parseISO,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";
import NavBar from "../../components/navigation/NavBar";

function ViewUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [user]);

  const deleteUserInformation = async () => {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid));
      alert("User information deleted successfully!");
      setUserInfo({});
      navigate("/user/setup");
    }
  };

  const navigateToUpdateUser = () => {
    navigate("/user/edit");
  };

  // Function to calculate age
  // Function to calculate age
  const calculateAge = (dateOfBirth) => {
    const birthDate = parseISO(dateOfBirth); // Assuming dateOfBirth is in ISO format
    const today = new Date();
    const years = differenceInYears(today, birthDate);
    const totalMonths = differenceInMonths(today, birthDate);
    const months = totalMonths % 12;
    const daysDifference = differenceInDays(today, birthDate);
    const daysInYearAndMonth = years * 365 + months * 30; // Approximation, considering an average month length of 30 days
    let days = daysDifference - daysInYearAndMonth;
    days = days % 30; // Adjusting in case the days exceed the average month length

    // Adjust for edge cases where day calculation might still be negative due to the approximation
    if (days < 0) {
      days += 30; // Correcting the negative days by adding a month's average days
      if (months === 0) {
        // If no months, subtract from years
        if (years > 0) {
          years -= 1;
          months = 11; // Adjusting months to 11 since a year was subtracted
        }
      } else {
        months -= 1; // Subtract one month to balance the days added
      }
    }

    return `${years} years, ${months} months, ${days} days`;
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="lg:mx-32 mx-8 mb-8">
        {isLoading ? (
          <div className="flex justify-center mt-32">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : userInfo.dateOfBirth ? (
          <>
            <h2 className="lg:scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8">
              User Information
            </h2>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{userInfo.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Age</TableCell>
                  <TableCell>{calculateAge(userInfo.dateOfBirth)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date of Birth</TableCell>
                  <TableCell>
                    {format(parseISO(userInfo.dateOfBirth), "MMMM dd, yyyy")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Starting Weight</TableCell>
                  <TableCell>{userInfo.startingWeight} kg</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Height</TableCell>
                  <TableCell>{userInfo.height} cm</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex flex-col lg:flex-row justify-evenly mt-4 lg:mx-24 ">
              <Button
                className="mb-4 bg-red-500"
                onClick={deleteUserInformation}
              >
                Delete My Information
              </Button>
              <Button onClick={navigateToUpdateUser}>
                Update My Information
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ViewUserInfo;
