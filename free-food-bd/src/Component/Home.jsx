import React, { useEffect, useState } from 'react';
import Carosoul from './Carosoul';
import FoodCard from './FoodCard';
import Testimonial from './Testimonial';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

            <div className="flex flex-col items-center justify-center">
                <div className='grid grid-cols-1 gap-5 xl:mt-1 md:grid-cols-1 p-5 lg:grid-cols-2 xl:grid-cols-3'>
                    {foods?.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}

                </div>
                <div className="flex justify-center w-full mt-6">
                    <Link to={'/available-food'}>
                        <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-white dark:text-gray-600">
                            See More
                        </button>
                    </Link>
                </div>
                <div className="">
                    <Testimonial></Testimonial>
                </div>
            </div>
        </div>
    );
};

export default Home;