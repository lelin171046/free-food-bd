import React, { useEffect, useState } from 'react';
import Carosoul from './Carosoul';
import FoodCard from './FoodCard';
import Testimonial from './Testimonial';
import axios from 'axios';

const Home = () => {
    const [foods, setFoods] = useState()

    useEffect(() => {
        const getData = async () => {
          const { data } = await axios(
            `${import.meta.env.VITE_API_URL
            }/all-foods?latest=true`
          )
    
          // filter according to bokked
          // const filteredData = data.filter(item => item.booked !== true)
          // console.log(filteredData);
    
          setFoods(data)
          console.log(data);
        }
        getData()
      }, [])

    return (
        <div>
           <Carosoul></Carosoul>

           <div className="items-center  justify-center grid">
           <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-1 p-10 lg:grid-cols-2 xl:grid-cols-3'>
          {foods?.map(food => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
            <button type="button" className="px-8 py-3 w-min font-semibold rounded-full dark:bg-gray-600 dark:text-white">Rounded</button>
            <div className="">
                <Testimonial></Testimonial>
            </div>
           </div>
        </div>
    );
};

export default Home;