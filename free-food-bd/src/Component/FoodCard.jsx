/* eslint-disable react/prop-types */
import { name } from '@cloudinary/url-gen/actions/namedTransformation';
import { Clock, MapPin, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
    // const { _id, foodName, foodQuantity, pickupLocation,

    //     expiredDateTime,

    //     additionalNotes,

    //     donatorEmail,

    //     name,

    //     photo, } = food ;

    return (
        // <div className="flex flex-col max-w-lg p-6 space-y-3 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
        //     <div className="flex space-x-4">
        //         <img alt="Donator" src={food?.donar.photo || ""} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
        //         <div className="flex flex-col space-y-1">
        //             <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{food?.foodName}</a>
        //             <span className="text-xs dark:text-gray-600">{food?.donar.name}</span>
        //         </div>
        //     </div>
        //     <div>
        //         <img src={food?.foodImage} alt="Food" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
        //         <h2 className="mb-1 text-xl font-semibold">{food?.foodName}</h2>
                
        //     </div>
        //     <div className="flex flex-col space-y-2">
        //         <p className="text-sm"><strong>Food Name:</strong> {food?.foodName}</p>
        //         <p className="text-sm"><strong>Quantity:</strong> Serves {food?.foodQuantity ||''} people</p>
        //         <p className="text-sm"><strong>Pickup Location:</strong> M{food?.pickupLocation}</p>
        //         <p className="text-sm"><strong>Expires:</strong> { new Date(food?.expiredDateTime).toLocaleDateString()}</p>
        //         <p className="text-sm"><strong>Notes:</strong> {food?.additionalNotes}</p>
        //     </div>
        //    <Link to={`/food-details/${food?._id}`}> <button className="mt-4 p-2 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700">View Details</button></Link>
        // </div>
        

        <div className="card card-compact  w-96 shadow-xl  bg-gray-200 px-10 pt-10 flex items-center justify-center">
        <figure className='w-full h-full object-cover'>
          <img
            src={food?.foodImage}
            alt="Shoes" />
        </figure>
        <div className="text-black card-body">
        <h3 className="text-lg font-bold text-gray-800">{food?.foodName}</h3>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <Clock className="w-4 h-4 mr-2" /> Expires: {new Date(food?.expiredDateTime).toLocaleDateString()}  
        </div>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <MapPin className="w-4 h-4 mr-2" /> {food?.pickupLocation}
        </div>
        <div className="text-sm text-gray-600 flex items-center mt-2">
          <User className="w-4 h-4 mr-2" /> Donated by: {food?.donar?.name || 'Unknown'}
        </div>
          <div className="card-actions justify-end">
            <Link to={`/food-details/${food?._id}`}>
            
            <button className="btn bg-black text-white">View Now</button>
            </Link>
          </div>
        </div>
      </div>
  


    );
};

export default FoodCard;