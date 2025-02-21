import React from "react";
import useAuth from "../Provider/useAuth";

const Profile = ({}) => {

 const {user} = useAuth()

 console.log(user, 'is');

  if (!user) return <p className="text-center text-gray-500">No user data available.</p>;

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md"
          src={user.photoURL || "https://lh3.googleusercontent.com/a/ACg8ocLyA_AGjJhTAGDwGgVn2h6jmZfBlQrIIbBwPOckbjd7tLS1BYEa=s96-c"}
          alt={user.displayName || "User Profile"}
        />

        {/* Name */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.displayName || "John Doe"}</h2>
        
        {/* Email */}
        <p className="text-gray-600 text-sm">{user.email || "johndoe@example.com"}</p>

        {/* Buttons */}
        <div className="mt-4 py-6 m-10 flex space-x-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
