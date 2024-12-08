import React from 'react'
import { useSelector } from 'react-redux';


const OrderAdress = ({addressDetails}) => {
  const name = useSelector((state) => state.auth.user.name); // Access userId from Redux state

  return (
    <>
    
      <div class="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>

        <dl>
          <dt class="text-base font-medium text-gray-900 dark:text-white">{name}</dt>
          <dd class="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{addressDetails.address}</dd>
          <dd class="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{addressDetails.city}</dd>
        </dl>
      </div>
    </>
  )
}

export default OrderAdress
