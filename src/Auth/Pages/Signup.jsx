import { useState } from "react";
import image from "./login.jpg"
import Navbar from "../Components/Navbar";
import { useSignup } from "../Hooks/useSignup";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [initialWeight, setInitialWeight] = useState("");
  const [initialHeight, setInitialHeight] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your form validation logic here
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    await signup(firstName, secondName, email, initialWeight, initialHeight, password)
  };

  return (
    <div className="">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-blue-700">
          {/* Side panel with art */}
          <img
            src={image}
            alt="Login Art"
            className="object-cover w-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          {/* Login form */}
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Adala"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="secondName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Second Name:
              </label>
              <input
                type="text"
                id="secondName"
                placeholder="Wanyande"
                onChange={(e) => setSecondName(e.target.value)}
                value={secondName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email address:
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="adalawanyande@afya-one.com"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="initialWeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Initial Weight (kg):
              </label>
              <input
                type="text"
                id="initialWeight"
                placeholder="70"
                onChange={(e) => setInitialWeight(e.target.value)}
                value={initialWeight}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="initialHeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Initial Height (cm):
              </label>
              <input
                type="text"
                id="initialHeight"
                placeholder="180"
                onChange={(e) => setInitialHeight(e.target.value)}
                value={initialHeight}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password:
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button  disabled={isLoading}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Signup;
