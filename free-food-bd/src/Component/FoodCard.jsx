/* eslint-disable react/prop-types */
import { name } from '@cloudinary/url-gen/actions/namedTransformation';
import { Clock, MapPin, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
    
    return (
        
        

        <div className="card card-compact  w-96 shadow-xl  bg-gray-200 px-10 pt-10 flex items-center justify-center">
        <figure className='w-full h-full '>
          <img
            src={food?.foodImage}
            alt="Food" />
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