import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Provider/useAuth";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="h-8 w-auto" src={logo} alt="FreeFood" />
            <span className="ml-2 font-bold text-xl">
              Free<span className="text-purple-600">Food</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/available-food"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
              Available Foods
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
             Contact
            </NavLink>


            {!user && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg ${
                    isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:text-purple-600"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Profile Dropdown (Hover & Clickable) */}
          {user && (
			 <div className="dropdown dropdown-end z-50 bg-white">
			 <div tabIndex={0} role="button" className="btn btn-ghost border-orange-500 btn-circle avatar">
			   <div className="w-10 rounded-full ">
				 <img
				   className="border-orange-500"
				   src={user?.photoURL || 'https://lh3.googleusercontent.com/a/ACg8ocLyA_AGjJhTAGDwGgVn2h6jmZfBlQrIIbBwPOckbjd7tLS1BYEa=s96-c'} />
			   </div>
			 </div>
			 <ul
			   tabIndex={0}
			   className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
			   <li>
				 <Link to={'/profile'} className="justify-between">
				   Profile
				   <span className="badge">New</span>
				 </Link>
			   </li>
			   <Link
                   to="/add-food"
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Add Food
                 </Link>
                 <Link
                   to="/my-food"
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Manage My Foods
                 </Link>
                 <Link
                   to="/my-food-request"
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                 My Foods Requests
                 </Link>
                 <button
                   onClick={logOut}
                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Logout
                 </button>
			 </ul>
		   </div>
            // <div
            //   className="relative dropdown dropdown-end"
            //   onMouseEnter={() => setIsDropdownOpen(true)}
            //   onMouseLeave={() => setIsDropdownOpen(false)}
            // >
            //   <button className="flex text-sm rounded-full dropdown dropdown-end focus:outline-none focus:ring-2 focus:ring-purple-500">
            //     <img className="h-8 w-8 rounded-full" src={user.photoURL} alt={user.displayName} />
            //   </button>

            //   {isDropdownOpen && (
            //     <div
            //       className="absolute z-50 right-0 dropdown dropdown-end top-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            //       onMouseEnter={() => setIsDropdownOpen(true)}
            //       onMouseLeave={() => setIsDropdownOpen(false)}
            //     >
            //       <Link
            //         to="/add-food"
            //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //       >
            //         Add Food
            //       </Link>
            //       <Link
            //         to="/my-food"
            //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //       >
            //         Manage My Foods
            //       </Link>
            //       <button
            //         onClick={logOut}
            //         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //       >
            //         Logout
            //       </button>
            //     </div>
            //   )}
            // </div>
          )}

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
