import React from 'react';
import Carosoul from './Carosoul';
import FoodCard from './FoodCard';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div>
           <Carosoul></Carosoul>

           <div className="items-center  justify-center grid">
            <FoodCard></FoodCard>
            <button type="button" className="px-8 py-3 w-min font-semibold rounded-full dark:bg-gray-600 dark:text-white">Rounded</button>
            <div className="">
                <Testimonial></Testimonial>
            </div>
           </div>
        </div>
    );
};

export default Home;