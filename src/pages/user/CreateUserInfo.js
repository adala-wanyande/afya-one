import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateUserInfoForm() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startingWeight, setStartingWeight] = useState("");
  const [height, setHeight] = useState("");
  const navigate = useNavigate();
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Name is required.";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    if (startingWeight <= 0) newErrors.startingWeight = "Starting weight must be greater than zero.";
    if (height <= 0) newErrors.height = "Height must be greater than zero.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userInfo = { fullName, dateOfBirth, startingWeight, height };

      try {
        await setDoc(doc(db, "users", userId), userInfo);
        alert("User information saved successfully!");
        navigate("/dashboard/");
      } catch (error) {
        console.error("Error adding document: ", error);
        setIsSubmitting(false);
      }
    }
  };

  if (!shouldRenderForm) {
    return null;
  }

  return (
    <div className="flex justify-center mt-16">
      <div className="rounded-lg border bg-white text-black shadow-md w-full max-w-md">
        <div className="flex flex-col p-6 space-y-3">
          <h3 className="font-semibold tracking-tight text-2xl">Welcome to Afya One!</h3>
          <p className="text-base text-gray-600">Let's get to know you. Feel free to share. This is a safe space.</p>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-2 pt-0 grid gap-4">
          <div className="grid gap-2">
            <label className="text-base font-medium" htmlFor="fullName">What's your name?</label>
            <input
              className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
              id="fullName"
              type="text"
              value={fullName}
              placeholder="One name is fine"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            {errors.fullName && (
              <div className="text-red-500 text-sm">{errors.fullName}</div>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-base font-medium" htmlFor="dateOfBirth">When were you born?</label>
            <input
              className="w-[160px] h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && (
              <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-base font-medium" htmlFor="startingWeight">What's your starting weight? (kg)</label>
            <input
              className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
              id="startingWeight"
              type="number"
              value={startingWeight}
              onChange={(e) => setStartingWeight(e.target.value)}
              placeholder="Starting Weight"
              required
            />
            {errors.startingWeight && (
              <div className="text-red-500 text-sm">{errors.startingWeight}</div>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-base font-medium" htmlFor="height">What's your starting height? (cm)</label>
            <input
              className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-500"
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height"
              required
            />
            {errors.height && (
              <div className="text-red-500 text-sm">{errors.height}</div>
            )}
          </div>
          <div className="flex items-center py-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-red-500 text-white shadow hover:bg-red-600 h-10 px-4 py-2 w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserInfoForm;
