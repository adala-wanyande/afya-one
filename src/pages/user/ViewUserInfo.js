import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { format, parseISO, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

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
      navigate('/user/setup');
    }
  };

  const navigateToUpdateUser = () => { 
    navigate('/user/edit');
  };

  // Function to calculate age
  const calculateAge = (dateOfBirth) => {
    const birthDate = parseISO(dateOfBirth); // Assuming dateOfBirth is in ISO format
    const today = new Date();
    const years = differenceInYears(today, birthDate);
    const months = differenceInMonths(today, birthDate) % 12;
    const days = differenceInDays(today, new Date(today.getFullYear(), today.getMonth() - months, birthDate.getDate())) % 30;
    return `${years} years, ${months} months, ${days} days`;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading user information...</p>
      ) : userInfo.dateOfBirth ? (
        <>
          <div className="mx-64">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-8">User Information</h2>
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
                  <TableCell>{format(parseISO(userInfo.dateOfBirth), 'MMMM dd, yyyy')}</TableCell>
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
            <div className="flex justify-evenly mt-4 mx-24">
              <Button onClick={deleteUserInformation}>Delete My Information</Button>
              <Button onClick={navigateToUpdateUser}>Update My Information</Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ViewUserInfo;