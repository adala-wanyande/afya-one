import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Account created:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in:", userCredential.user);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
