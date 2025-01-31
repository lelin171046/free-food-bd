import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, MapPin, User } from 'lucide-react';
import useAuth from '../Provider/useAuth';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate()

  // Fetch food details using React Query
  const { data: food, isLoading, isError, error } = useQuery({
    queryKey: ['foodDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/food/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodData = {
      foodId: food?._id,
      foodName: food?.foodName,
      requestDate: startDate,
      foodQuantity: food?.foodQuantity,
      expiredDateTime: food?.expiredDateTime,
      email: user?.email,
      status: 'Pending',
      comment: form.additionalNote.value,
    };
    console.log('Request Data:', foodData);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/food-request`, foodData);
      // console.log(data);
      toast.success('Request placed successfully');
      navigate('/my-food-request')
    } catch (err) {
      toast.error(err.response.data);
      e.target.reset()
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <form onSubmit={handleRequest} className="max-w-sm mx-auto m-10 p-5 bg-white rounded-lg shadow-md">
      <div className="relative bg-gray-200 h-48 flex items-center justify-center">
        {food?.foodImage ? (
          <img src={food.foodImage} alt={food.foodName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
        <div className="absolute top-2 right-2 bg-white text-black text-xs font-semibold py-1 px-2 rounded-full">
          {food?.foodQuantity} {food?.foodQuantity > 1 ? 'boxes' : 'box'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{food?.foodName}</h3>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <Clock className="w-4 h-4 mr-2" /> Expires: {new Date(food.expiredDateTime).toLocaleDateString()}  
        </div>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <MapPin className="w-4 h-4 mr-2" /> {food?.pickupLocation}
        </div>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <User className="w-4 h-4 mr-2" /> Donated by: {food?.donar?.name || 'Unknown'}
        </div>
        <button type="button" className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg" onClick={() => document.getElementById('request_modal').showModal()}>
          Request
        </button>
        <dialog id="request_modal" className="modal">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h2 className="text-xl font-bold text-black mb-4 text-center">Request Food</h2>
              <div className="">
                <h3 className="text-lg font-bold text-gray-800">{food?.foodName}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img className="col-span-2 bg-gray-100 shadow-lg p-6 w-full rounded-lg" src={food?.foodImage} alt="" />
                <p className=" col-span-2text-sm dark:text-gray-600">This meal can serve up to {food.foodQuantity} people. Pickup from Main Street, City Center.</p>
                
                <div className="text-sm text-gray-600 flex items-center mt-2">
                  <Clock className="w-4 h-4 mr-2" /> Expires: {new Date(food.expiredDateTime).toLocaleDateString()}  
                </div>
                <div className="">
                <label className="  text-sm font-medium text-black">Request Date:</label>
                <DatePicker
                  className="mt-1 block w-full text-black rounded-md bg-gray-300 border-gray-300 shadow-sm"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                </div>
                <div className="text-sm text-gray-600 flex items-center mt-2">
          <User className="w-4 h-4 mr-2" /> Donated by: {food?.donar?.name || 'Unknown'}
        </div>
                <textarea
                  rows="3"
                  name="additionalNote"
                  placeholder="Enter any additional information or requests here..."
                  className="col-span-2 mt-1 text-black block w-full rounded-md bg-gray-300 border-gray-300 shadow-sm"
                />
              </div>
              <button type="submit" className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg">
                Confirm Request
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </form>
  );
};

export default FoodDetails;
