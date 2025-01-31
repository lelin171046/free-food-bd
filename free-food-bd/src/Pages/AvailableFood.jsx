import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FoodCard from '../Component/FoodCard';

const fetchFoods = async ({ queryKey }) => {
  const [, currentPage, itemsPerPage, sort, search] = queryKey;
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-foods?page=${currentPage}&size=${itemsPerPage}&sort=${sort}&search=${search}`
  );
  return data.filter(item => !item.booked); // Remove booked foods
};

const fetchFoodCount = async ({ queryKey }) => {
  const [, search] = queryKey;
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods-count?search=${search}`);
  return data.count;
};

const AvailableFood = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  // Fetch food items
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ['foods', currentPage, itemsPerPage, sort, search],
    queryFn: fetchFoods,
    keepPreviousData: true, // Keeps old data while fetching new
  });

  // Fetch total food count
  const { data: count = 10 } = useQuery({
    queryKey: ['foodCount', search],
    queryFn: fetchFoodCount,
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const handleSearch = e => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSort('');
    setSearch('');
    setSearchText('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        <form onSubmit={handleSearch}>
          <div className="flex p-1 border rounded-lg">
            <input
              className="px-6 py-2 bg-white outline-none"
              type="text"
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Enter Food Name"
            />
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Search</button>
          </div>
        </form>

        <select
          onChange={e => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
          value={sort}
          className="border p-4 rounded-md"
        >
          <option value="">Sort By Deadline</option>
          <option value="dsc">Descending Order</option>
          <option value="asc">Ascending Order</option>
        </select>

        <button onClick={handleReset} className="btn">Reset</button>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8 p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foods.map(food => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 mx-1 rounded-md transition ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, numberOfPages))}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AvailableFood;
