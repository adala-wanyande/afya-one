import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/buttons/LoadingButton";

function CreateUserInfoForm() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startingWeight, setStartingWeight] = useState("");
  const [height, setHeight] = useState("");
  const navigate = useNavigate();
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

  useEffect(() => {
    const checkUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          alert("User information already exists.");
          navigate("/user/");
        } else {
          setShouldRenderForm(true);
        }
      } else {
        navigate("/signin");
      }
    };

    checkUserInfo();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission, disable the button

    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userInfo = { fullName, dateOfBirth, startingWeight, height };

      try {
        await setDoc(doc(db, "users", userId), userInfo);
        alert("User information saved successfully!");
        navigate("/user/");
      } catch (error) {
        console.error("Error adding document: ", error);
        setIsSubmitting(false); // In case of error, re-enable the button
      }
    }
  };

  if (!shouldRenderForm) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <input
        type="number"
        value={startingWeight}
        onChange={(e) => setStartingWeight(e.target.value)}
        placeholder="Starting Weight"
        required
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height"
        required
      />
      <button type="submit" hidden={isSubmitting}>
        Submit
      </button>
      {isSubmitting ? (
        <>
          <LoadingButton></LoadingButton>
        </>
      ) : (
        console.log()
      )}
    </form>
  );
}

export default CreateUserInfoForm;
