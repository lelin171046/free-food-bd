import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Provider/useAuth';
import logo from '../assets/Logo.png'

const Navbar = () => {

	const { user, logOut } = useAuth()

	const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
		<div className="bg-white  shadow-lg">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <div className="flex justify-between h-16">
			<div className="flex items-center">
			  <Link href="/" className="flex-shrink-0 flex items-center">
				<img className="h-8 w-auto" src={logo} alt="WorkFinder" width={32} height={32} />
				<span className="ml-2 font-bold text-xl">Free<span className="text-purple-600">Food</span></span>
			  </Link>
			</div>
			<div className="hidden sm:ml-6 sm:flex sm:items-center">
			  <div className="relative">
				<input
				  type="text"
				  placeholder="Search"
				  className="w-full sm:w-64 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
				/>
			  </div>
			  <div className="ml-4 flex items-center space-x-4">
				<NavLink to={'/'}>Home</NavLink>
				<NavLink to={'/available-food'}>Available Foods</NavLink>
				<Link to={'/demo'}>img</Link>
				{/* {user && <NavLink href="/temp">Earnings</NavLink>} */}
				{!user && <NavLink to={'login'}>Login</NavLink>}
			  </div>
			</div>
			<div className="hidden sm:ml-6 sm:flex sm:items-center">
			  {user && (
				<div className="ml-3 relative">
				  <div>
					<button
					  onClick={() => setIsMenuOpen(!isMenuOpen)}
					  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
					>
					  <img
						className="h-8 w-8 rounded-full"
						src={user.photoURL}
						alt={user.displayName}
						width={32}
						height={32}
					  />
					</button>
				  </div>
				  {isMenuOpen && (
					<div className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					  <Link to={'add-food'}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
						Add Food
					  </Link>
					  <Link to={'/my-food'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
					  Manage My Foods
					  </Link>
					  <Link to={'/food-req'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
					  My Food Request
					  </Link>
					  
					  <button
						onClick={logOut}
						className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					  >
						Logout
					  </button>
					</div>
				  )}
				</div>
			  )}
			</div>
			<div className="-mr-2 flex items-center sm:hidden">
			  <button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
			  >
				<span className="sr-only">Open main menu</span>
				<svg
				  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
				  xmlns="http://www.w3.org/2000/svg"
				  fill="none"
				  viewBox="0 0 24 24"
				  stroke="currentColor"
				  aria-hidden="true"
				>
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
				</svg>
				<svg
				  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
				  xmlns="http://www.w3.org/2000/svg"
				  fill="none"
				  viewBox="0 0 24 24"
				  stroke="currentColor"
				  aria-hidden="true"
				>
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg>
			  </button>
			</div>
		  </div>
		</div>
  
		<div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
		  <div className="px-2 pt-2 pb-3 space-y-1">
			<NavLink href="/" mobile>Home</NavLink>
			<NavLink href="/all-jobs" mobile>All Jobs</NavLink>
			{user && <NavLink href="/temp" mobile>Earnings</NavLink>}
			{!user && <NavLink href="/login" mobile>Login</NavLink>}
		  </div>
		  {user && (
			<div className="pt-4 z-50 pb-3 border-t border-gray-200">
			  <div className="flex items-center px-5">
				<div className="flex-shrink-0">
				  <img
					className="h-10 w-10 rounded-full"
					src={user.photoURL}
					alt={user.displayName}
					width={40}
					height={40}
				  />
				</div>
				<div className="ml-3">
				  <div className="text-base font-medium text-gray-800">{user.displayName}</div>
				</div>
			  </div>
			  <div className="mt-3 space-y-1">
				<NavLink href="add-food" mobile>Add Food</NavLink>
				<NavLink href="/my-jobs" mobile>My Posted Jobs</NavLink>
				<NavLink href="/my-bids" mobile>My Bids</NavLink>
				<NavLink href="/bid-req" mobile>Bid Requests</NavLink>
				<button
				  onClick={logOut}
				  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
				>
				  Logout
				</button>
			  </div>
			</div>
		  )}
		</div>
	  </div>
    );
};

export default Navbar;