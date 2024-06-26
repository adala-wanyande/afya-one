import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/afya-one-logo.jpg";

const LandingPage = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-white text-white py-8">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="grid content-center">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8 rounded" alt="Afya One Logo" />
            </Link>
          </div>
          <nav>
            <Link to="/signin" className="text-gray-800 hover:text-gray-300 px-3 py-2 rounded-md">
              Sign In
            </Link>
            <Link to="/signup" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-red-600">Welcome to Afya One 🏋️</h2>
          <p className="text-lg mb-4 text-gray-800">
            It might just be time for you to improve your life, wasteman! 🫵
          </p>
          <Link
            to="/signup"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="p-6 bg-white border border-red-500 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-black">📋 Track Workouts</h3>
              </div>
              <p className="text-gray-700">
                Keep a detailed log of your workouts and retrieve them anytime.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white border border-red-500 rounded-md shadow-md">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-black">📈 Workout Streaks</h3>
              </div>
              <p className="text-gray-700">
                Maintain a streak of workout commits with a GitHub-like graph.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white border border-red-500 rounded-md shadow-md">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-black">⚖️ Weight Tracking</h3>
              </div>
              <p className="text-gray-700">
                Monitor your weight progress with an intuitive graph feature.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="p-6 bg-white border border-red-500 rounded-md shadow-md">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-black">📜 Workout Retrieval</h3>
              </div>
              <p className="text-gray-700">
                Retrieve your previous workouts to know exactly what you did.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="p-6 bg-white border border-red-500 rounded-md shadow-md">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-black">🍎 Nutritional Entries</h3>
              </div>
              <p className="text-gray-700">
                Log your meals and track your daily eating habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-6">
            Sign up now and experience the power of Afya One.
          </p>
          <Link
            to="/signup"
            className="bg-white text-red-500 hover:bg-red-600 px-8 py-3 rounded-md inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Afya One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
