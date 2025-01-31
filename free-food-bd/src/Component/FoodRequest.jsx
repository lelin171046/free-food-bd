import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import useAuth from '../Provider/useAuth';
import Loader from './Loader';
import useAxiosSecure from '../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const FoodRequest = () => {
  const { user } = useAuth()
  const axiosSure = useAxiosSecure()
  const queryClient = useQueryClient()
  const {
    data: foods = [],
    isError,
    isLoading,
    refetch,
    error } = useQuery({
      queryFn: () => getData(user),
      queryKey: ['foods', user?.email],

    })




  const getData = async (user) => {
    const { data } = await axiosSure(`/my-food-requests/${user?.email}`)
    console.log(data, 'hiiiii');
    return data
  }

  const { mutateAsync, } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/food-request/${id}`, { status })
      console.log(data);
    },
    onSuccess: () => {
      console.log('ok updated');
      toast.success('updated successfully')
      //refresh ui

      // refetch()
      //OR
      queryClient.invalidateQueries({ queryKey: ['foods'] })

    }
  })

  const handleDeleteMyFoodRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSure.delete(`/food-request/delete/${id}`);
        if (data.deletedCount > 0) {
          toast.success("Deleted Success")
          refetch()
        }
      }
    });
  };


  //handle Status

  const handleStatus = async (id, prevStatus, status) => {
    if (prevStatus === status) return toast.error('Already aceepted')

    getData()

    await mutateAsync({ id, status })
  }
  if (isLoading) return <Loader></Loader>
  if (isError || error) {
    console.log(isError, error);

  }
  return (
    <section className='container px-4 mx-auto pt-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {foods.length} Requests
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-violet-300'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Food Title</span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Email</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white'
                    >
                      <span>Request Note</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Quantity</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white'
                    >
                      Request Date
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white'
                    >
                      Status
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>

                  {
                    foods.map(food => <tr key={food._id}>


                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {food.foodName}
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {food.email}
                      </td>

                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {food.comment}
                      </td>

                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {food.foodQuantity}
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-2'>
                          <p
                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                          text-xs'
                          >
                            {new Date(food.requestDate).toLocaleDateString()}                     </p>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                        <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500'>
                          <span className='h-1.5 w-1.5 rounded-full bg-yellow-500'></span>
                          <h2 className='text-sm font-normal '>
                            {food.status}
                          </h2>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-6'>
                          <button
                            onClick={() => handleStatus(food._id, food.status, 'In Progress')}
                            disabled={food.status === 'Complete'}
                            className={`disabled:cursor-not-allowed text-gray-500 transition-colors duration-200
                             ${food.status !== 'Complete' && 'hover:text-red-500'} focus:outline-none`}
                          >✔</button>

                          {/* cancel button */}
                          <button
                            // onClick={() => handleStatus(food._id, food.status, 'Cancelled')}
                            // disabled={food.status === 'Complete'}
                            onClick={() => handleDeleteMyFoodRequest(food._id)}
                            className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                            {/* ${food.status !== 'Complete' && 'hover:text-red-500'}  */}

                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                              />
                            </svg>
                          </button>
                        </div>
                      </td>

                    </tr>)
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default FoodRequest;