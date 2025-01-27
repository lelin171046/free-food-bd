import React from 'react';
import Carosoul from './Carosoul';
import FoodCard from './FoodCard';

const Home = () => {
    return (
        <div>
           <Carosoul></Carosoul>

           <div className="items-center  justify-center grid">
            <FoodCard></FoodCard>
            <button type="button" className="relative px-4 py-2 ml-4 overflow-hidden font-semibold rounded dark:bg-gray-800 dark:text-gray-50">Show all
	<span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-violet-600">New</span>
</button>
           </div>
        </div>
    );
};

export default Home;