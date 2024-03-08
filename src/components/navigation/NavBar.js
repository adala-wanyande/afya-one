import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import logo from "../../assets/images/afya-one-logo.jpg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import { Button } from "../../components/ui/button";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Afya One
          </span>
        </a>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Weight</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[250px]">
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/weight/new">
                        Add new weight entry
                      </Link>
                    </li>
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/weight/all">
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
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/workout/new">
                        Add new workout
                      </Link>
                    </li>
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/workout/all">
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
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/nutrition/new">
                        Add new nutrition entry
                      </Link>
                    </li>
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/nutrition/all">
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
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/sleep/new">
                        Add new sleep entry
                      </Link>
                    </li>
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/sleep/all">
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
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/timetable">
                        View current timetable
                      </Link>
                    </li>
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/timetable/all">
                        View previous timetables
                      </Link>
                    </li>
                    <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Link  className="pl-2 text-sm leading-tight text-muted-foreground"
                      to="/timetable/create">
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
                        <Link  className="pl-2 py-2 my-2 text-sm leading-tight text-muted-foreground"
                        to="/user/">
                          View user information
                        </Link>
                      </li>
                      <li class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link  className="pl-2 py-2 my-2 text-sm leading-tight text-muted-foreground"
                        to="/user/edit">
                          Update user information
                        </Link>
                      </li>
                    </ul>
                    <div class="flex justify-center py-4">
                      <Button
                        onClick={handleSignOut}>
                        Sign out
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;