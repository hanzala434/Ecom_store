import React from 'react'
import { useSelector } from 'react-redux'

const OrderCard = ({orderDetails}) => {
  const userPhone=useSelector((state)=>state.auth.user.phone)
  return (
   <>
         <div className='p-10 bg-slate-400 rounded-lg flex flex-col w-auto m-4 lg:m-auto lg:w-4/6'>
            <h1 className='text-2xl font-bold flex justify-center m-auto'>Order #{orderDetails._id}</h1>
            <div className='ml-2 flex flex-col content-center m-auto p-4'>
            <h3 className='text-xl p-1'>Name: {orderDetails.userName}</h3>
            <h3 className='text-xl p-1'>User Id: {orderDetails.userId}</h3>
            <h3 className='text-xl p-1'>Payment Method: {orderDetails.paymentMethod}</h3>
            <h3 className='text-xl p-1'>Payment Status: {orderDetails.paymentStatus}</h3>
            <h3 className='text-xl p-1'>Total Amount: {orderDetails.totalAmount}</h3>
            <h3 className='text-xl p-1'>Order Date: {orderDetails.orderDate}</h3>
            <h3 className='text-xl p-1'>Contact: {userPhone}</h3>
            <h3 className='text-xl p-1'>Address: {orderDetails.addressInfo.address}</h3>
            <h3 className='text-xl p-1'>City: {orderDetails.addressInfo.city}({orderDetails.addressInfo.pincode})</h3>




            </div>

        </div>
   </>
  )
}

export default OrderCard
