import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Loader2, Locate, LocateFixedIcon, LocateIcon, LocateOff, LocateOffIcon, User } from 'lucide-react';
import useAuth from '../Provider/useAuth';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

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

    if(user?.email === food?.donar?.email) return toast.error('You can request your own post')
      
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/food-request`, foodData);
      toast.success('Request placed successfully');
      navigate('/my-food-request');
    } catch (err) {
      toast.error(err.response?.data || 'Request failed');
      e.target.reset();
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="items-center flex justify-center">
      <div className="card  lg:card-side bg-gray-300 max-w-fit m-5 text-black h-max shadow-xl p-5">
      <figure>
        <img src={food?.foodImage} alt={food?.foodName} className="w-full h-60 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{food?.foodName}</h2>
        <p><strong>Donated by:</strong> {food?.donar?.name || 'Unknown'}</p>
        <p className='text-xs'>Donator email:{food?.donar?.email}</p>
        <p><strong>Quantity:</strong> Serves {food?.foodQuantity} people</p>
        <p><strong className='text-red-500'>Expires:</strong> {new Date(food?.expiredDateTime).toLocaleDateString()}</p>
        <p className='text-xs'>Additional Note: {food?.additionalNotes}</p>

        {/* Button to open modal */}
        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>
          Request
        </button>

        {/* Modal (moved outside form) */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-slate-200">
            {/* Close Button */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h2 className="text-xl font-bold text-black mb-4 text-center">Request Food</h2>
            <img className="bg-gray-100 shadow-lg p-6 w-full rounded-lg" src={food?.foodImage || 'no img'} alt="" />
            <p className="text-sm">This meal can serve up to {food?.foodQuantity} people.</p>

            {/* Form inside modal */}
            <form onSubmit={handleRequest}>
              <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-red-500" />
                  <span className="font-medium text-red-500">Expires:</span> {new Date(food?.expiredDateTime).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium">Donated by:</span> {food?.donar?.name || 'Unknown'}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-900">Request Date:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="relative text-black bg-white z-50"
                  />
                </div>
                <div className="flex items-center flex-wrap text-sm w-full text-gray-700">
               <Locate></Locate>
               <span className=" block text-sm font-semibold text-gray-900">Pickup Location: </span> {food?.pickupLocation || 'Unknown'}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-900">Additional Information:</label>
                  <textarea
                    rows="3"
                    name="additionalNote"
                    placeholder="Enter any additional information or requests here..."
                    className="mt-1 block w-full text-black rounded-md bg-gray-200 border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
                  />
                </div>
                <label className="block text-sm font-semibold text-gray-900">User email:</label>
                <p>{user?.email}</p>
              </div>

              {/* Ensure button does not trigger form submission */}
              <button type="submit" className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg">
                Confirm Request
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
    </div>
    
  );
};

export default FoodDetails;
