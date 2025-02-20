import React from 'react';
import { useState } from 'react';
import useAuth from '../Provider/useAuth';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddFood = () => {
   
      const {user} = useAuth()

      const navigate = useNavigate();



  const [foodStatus, setFoodStatus] = useState("available");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    const form = e.target
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodQuantity = parseFloat(form.foodQuantity.value);
    const pickupLocation = form.pickupLocation.value;
    const expiredDateTime = form.expiredDateTime.value;
    const additionalNotes = form.additionalNotes.value;
    // const donatorName = form.donatorName.value;
    const email = form.donatorEmail.value;

    const foodData = { 
        foodName, 
        foodImage,
        foodQuantity,
        pickupLocation,
        expiredDateTime,
        additionalNotes,
        booked: false,

        donar: {
            email,
            name: user?.displayName,
            photo:user?.photoURL

        }
        

    }
    console.log(foodData);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-food`,
        foodData
      )
      console.log(data)
      toast.success('Job Data Updated Successfully!')
      navigate('/my-food')
    } catch (err) {
      console.log(err)
    }



  };
  // Simulated logged-in user data
  const loggedInUser = {
    name: "John Doe",
    email: "john@example.com",
    image: "https://ibb.co.com/c1FT26j",
  };

  return (
    <section className="p-6 min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 text-gray-800 flex items-center justify-center">
    <form onSubmit={handleSubmit} className="container max-w-4xl mx-auto space-y-8 bg-white  rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.01]">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Food Donation Form</h2>
      
      {/* Food Donation Information */}
      <fieldset className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-xl shadow-md bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="space-y-2 col-span-full md:col-span-1">
          <p className="font-semibold text-lg text-indigo-700">Food Donation Information</p>
          <p className="text-sm text-gray-600">Please provide details about the food you wish to donate.</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full md:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="foodName"  className="text-sm font-medium text-gray-700">Food Name</label>
            <input id="foodName" name='food' type="text" placeholder="Enter food name" className="mt-1 block w-full px-3 py-2 bg-white border border-indigo-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              transition duration-150 ease-in-out" required />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="foodImage" className="text-sm font-medium text-gray-700">Food Image</label>
            <input id="foodImage" type="text"  className="mt-1 file-input block w-full px-3 py-2 bg-white border border-indigo-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              transition duration-150 ease-in-out" />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="foodQuantity" className="text-sm font-medium text-gray-700">Food Quantity</label>
            <input id="foodQuantity" type="number" min="1" placeholder="Enter quantity" className="mt-1 block w-full px-3 py-2 bg-white border border-indigo-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              transition duration-150 ease-in-out" required />
          </div>
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="pickupLocation" className="text-sm font-medium text-gray-700">Pickup Location</label>
            <input id="pickupLocation" type="text"  placeholder="Enter pickup address" className="mt-1 block w-full px-3 py-2 bg-white border border-indigo-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              transition duration-150 ease-in-out" required />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="expiredDateTime" className="text-sm font-medium text-gray-700">Expired Date/Time</label>
            <input id="expiredDateTime" type="datetime-local" className="mt-1 block w-full px-3 py-2 bg-white border border-indigo-300 rounded-md text-sm shadow-sm
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              transition duration-150 ease-in-out" required />
          </div>
          <div className="col-span-full">
            <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea id="additionalNotes" placeholder="Any additional information about the food" className="mt-1 block w-full px-3 py-2 bg-white border border-indigo-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              transition duration-150 ease-in-out h-32" />
          </div>
        </div>
      </fieldset>
      
      {/* Donator Information */}
      <fieldset className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-xl shadow-md bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="space-y-2 col-span-full md:col-span-1">
          <p className="font-semibold text-lg text-indigo-700">Donator Information</p>
          <p className="text-sm text-gray-600">This information will be taken from your profile.</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full md:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">Donator Name</label>
            <input type="text" defaultValue={user?.name || user?.displayName} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-indigo-300 rounded-md text-sm shadow-sm" />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">Donator Email</label>
            <input type="email" name="donatorEmail" defaultValue={user?.email} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-indigo-300 rounded-md text-sm shadow-sm" />
          </div>
          <div className="col-span-full">
            <label className="text-sm font-medium text-gray-700">Donator Image</label>
            <div className="flex items-center space-x-2 mt-1">
              <img src={loggedInUser.image} alt="Donator" className="w-16 h-16 rounded-full border-4 border-indigo-300 shadow-md" />
            </div>
          </div>
        </div>
      </fieldset>
      
      <input type="hidden" name="foodStatus" value={foodStatus} />
      
      {/* Submit button */}
      <div className="flex justify-end space-x-2">
        <button type="submit" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition-all duration-150 hover:scale-105 active:scale-95 shadow-lg">
          Add Donation
        </button>
      </div>
    </form>
  </section>
  );



    
};

export default AddFood;