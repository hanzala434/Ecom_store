import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllAddresses } from '../features/address/addressSlice';

const UserAddressList = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userId = useSelector((state) => state.auth.user._id); // Access userId from Redux state
    const { addresses,isError,message } = useSelector((state) =>state.address);
    console.log(addresses)
    useEffect(() => {
      if (isError) {
        console.log(message);
        
      }
      if (userId) {
        dispatch(getAllAddresses(userId));
      }
      // return () => {
      //   dispatch(reset())
      // }
      
    }, [userId,isError, message, dispatch]
  );
  return (
    <>
  <section className="bg-white py-8 antialiased dark:bg-white md:py-16 max-lg:mt-16 m-2 p-2">
    
    <div class="mx-auto max-w-3xl">
    <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery information</h4>
       {addresses?.data?.length > 0 ? (
            addresses.data.map((address) => (
              <dl key={address._id}>
                <dt className="text-base font-medium text-gray-900 dark:text-white">
                {address.address}
                </dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                {address.city} 
                </dd>
                </dl>

            ))
          ) : (
            <p className="text-base text-gray-500 dark:text-gray-400">
              No addresses available.
            </p>
          )}
      </div>
      </div>
      </section>
    </>
  )
}

export default UserAddressList
