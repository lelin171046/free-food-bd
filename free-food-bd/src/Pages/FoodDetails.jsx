import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Clock, MapPin, User, X } from 'lucide-react';
import useAuth from '../Provider/useAuth';

const FoodDetails = () => {
  const { id } = useParams(); // Get the food ID from route parameters
  const { user } = useAuth();

  // Fetch the food details using React Query
  const { data: food, isLoading, isError, error } = useQuery({
    queryKey: ['foodDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/food/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-sm mx-auto m-10 p-5 bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative bg-gray-200 h-48 flex items-center justify-center">
        {food.foodImage ? (
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
        <div className="absolute top-2 right-2 bg-white text-black text-xs font-semibold py-1 px-2 rounded-full">
          {food.foodQuantity} {food.foodQuantity > 1 ? 'boxes' : 'box'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{food.foodName}</h3>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <Clock className="w-4 h-4 mr-2" />
          Expires: {food.expiredDateTime}
        </div>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <MapPin className="w-4 h-4 mr-2" />
          {food.pickupLocation} {/* Corrected reference to location */}
        </div>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <User className="w-4 h-4 mr-2" />
          Donated by: {food.donar?.name || 'Unknown'}
        </div>

        <div className="">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" onClick={() => document.getElementById('my_modal_4').showModal()}>Request</button>
          <dialog id="my_modal_4" className="modal">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                {/* Close Icon */}
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h2 className="text-xl font-bold mb-4 text-center">Request Food</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Image Placeholder */}
                  <div className="col-span-2 flex items-center justify-center bg-gray-100 h-32 rounded-lg">
                    <span className="text-gray-400">No Image Available</span>
                  </div>

                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value="Margherita Pizza"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Food ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Food ID</label>
                    <input
                      type="text"
                      value="1"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Donator Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Donator Email</label>
                    <input
                      type="text"
                      value="pizza.lover@example.com"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Donator Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Donator Name</label>
                    <input
                      type="text"
                      value="Pizza Lover"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Your Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Email</label>
                    <input
                      type="text"
                      value="logged.in.user@example.com"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Request Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request Date</label>
                    <input
                      type="text"
                      value="Jan 27, 2025, 11:50:19 PM"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Pickup Location */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                    <input
                      type="text"
                      value="123 Main St, Anytown, USA"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      value="Jul 15, 2023, 6:00:00 PM"
                      readOnly
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                    <textarea
                      rows="3"
                      placeholder="Enter any additional information or requests here..."
                      className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button className="mt-4 w-full bg-black text-black py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Confirm Request
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
