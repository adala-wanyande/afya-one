import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import logo from "../../assets/images/afya-one-logo.jpg";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";

const NavBar = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [workoutsDropdownOpen, setWorkoutsDropdownOpen] = useState(false);
  const [weightDropdownOpen, setWeightDropdownOpen] = useState(false);
  const [sleepDropdownOpen, setSleepDropdownOpen] = useState(false);
  const [nutritionDropdownOpen, setNutritionDropdownOpen] = useState(false);
  const [timetableDropdownOpen, setTimetableDropdownOpen] = useState(false);
  const [userInfoDropdownOpen, setUserInfoDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // Toggle function for the nested dropdown
  const toggleWorkoutsDropdown = (e) => {
    e.preventDefault(); // Prevent the link default action
    e.stopPropagation(); // Stop click from propagating to other elements
    setWorkoutsDropdownOpen(!workoutsDropdownOpen);
  };

  const toggleWeightDropdown = (e) => {
    e.preventDefault(); // Prevent the link default action
    e.stopPropagation(); // Stop click from propagating to other elements
    setWeightDropdownOpen(!weightDropdownOpen);
  };

  const toggleNutritionDropdown = (e) => {
    e.preventDefault(); // Prevent the link default action
    e.stopPropagation(); // Stop click from propagating to other elements
    setNutritionDropdownOpen(!nutritionDropdownOpen);
  };

  const toggleSleepDropdown = (e) => {
    e.preventDefault(); // Prevent the link default action
    e.stopPropagation(); // Stop click from propagating to other elements
    setSleepDropdownOpen(!sleepDropdownOpen);
  };

  const toggleTimetableDropdown = (e) => {
    e.preventDefault(); // Prevent the link default action
    e.stopPropagation(); // Stop click from propagating to other elements
    setTimetableDropdownOpen(!timetableDropdownOpen);
  };

  const toggleUserInfoDropdown = (e) => {
    e.preventDefault(); // Prevent the link default action
    e.stopPropagation(); // Stop click from propagating to other elements
    setUserInfoDropdownOpen(!userInfoDropdownOpen);
  };

  return (
    <div className="m-4">
      <div className="flex justify-between mb-2 items-center lg:mx-32">
        <div className="grid content-center">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Afya One Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Afya One
            </span>
          </Link>
        </div>
        <div>
          <div class="hidden lg:flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Weight</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[250px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[250px]">
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/weight/new"
                        >
                          Add new weight entry
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/weight/all"
                        >
                          View previous weight entries
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Workouts</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/workout/new"
                        >
                          Add new workout
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/workout/all"
                        >
                          View previous workouts
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Nutrition</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[250px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[250px]">
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/nutrition/new"
                        >
                          Add new nutrition entry
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/nutrition/all"
                        >
                          View previous nutrition entries
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sleep</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[250px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[250px]">
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/sleep/new"
                        >
                          Add new sleep entry
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/sleep/all"
                        >
                          View previous sleep entries
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Timetable</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/timetable"
                        >
                          View current timetable
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/timetable/all"
                        >
                          View previous timetables
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link
                          className="pl-2 text-sm leading-tight text-muted-foreground"
                          to="/timetable/new"
                        >
                          Create new timetable
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>User Info</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="divide-y divide-gray-100">
                      <ul className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                        <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <Link
                            className="pl-2 py-2 my-2 text-sm leading-tight text-muted-foreground"
                            to="/user/"
                          >
                            View user information
                          </Link>
                        </li>
                        <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <Link
                            className="pl-2 py-2 my-2 text-sm leading-tight text-muted-foreground"
                            to="/user/edit"
                          >
                            Update user information
                          </Link>
                        </li>
                      </ul>
                      <div class="flex justify-center py-4">
                        <Button onClick={handleSignOut}>Sign out</Button>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={navOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12h18M3 6h18M3 18h18"
            />
          </svg>
        </button>
      </div>
      {navOpen && (
        <nav className="font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownLargeButton"
          >
            <li className="relative">
              <Link
                to="/"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={toggleWorkoutsDropdown}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Workouts
                <svg
                  class="w-2.5 h-2.5 ms-2.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {workoutsDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/workout/new"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Add new workout
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/workout/all"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View previous workouts
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            {/* Other nav items */}
            <li className="relative">
              <button
                onClick={toggleWeightDropdown}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Weight
                <svg
                  class="w-2.5 h-2.5 ms-2.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {weightDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="weight/new"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Add new weight entry
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="weight/all"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View previous weight entries
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleNutritionDropdown}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Nutrition
                <svg
                  class="w-2.5 h-2.5 ms-2.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {nutritionDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/nutrition/new"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Add new nutrition entry
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/nutrition/all"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View previous nutrition entries
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleSleepDropdown}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sleep
                <svg
                  class="w-2.5 h-2.5 ms-2.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {sleepDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/sleep/new"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Add new sleep entry
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sleep/all"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View previous sleep entries
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleTimetableDropdown}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Timetable
                <svg
                  class="w-2.5 h-2.5 ms-2.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {timetableDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/timetable"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View current timetable
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/timetable/all"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View previous timetables
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/timetable/new"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Create new timetable
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleUserInfoDropdown}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Your Information
                <svg
                  class="w-2.5 h-2.5 ms-2.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {userInfoDropdownOpen && (
                <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/user/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        View user information
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/edit"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Update user information
                      </Link>
                    </li>
                    <li>
                      <div class="flex justify-center py-4">
                        <Button onClick={handleSignOut}>Sign out</Button>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;