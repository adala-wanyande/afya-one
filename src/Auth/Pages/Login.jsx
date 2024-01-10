import { useState } from "react";
import image from "./login.jpg"
import { useLogin } from "../Hooks/useLogin"
import Navbar from "../Components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    return await login(email, password);
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
          <form className="min-w-[250px] px-8 lg:px-4 mx-auto" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address:
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="adalawanyande@afya-one.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log in
            </button>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
