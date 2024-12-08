import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { getAllOrders,getOrderDetails,resetOrderDetails } from '../features/order/orderSlice'


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { id } = useParams();


  const { orderList,isError, message } = useSelector((state) =>
    state.order,
    
  );


  useEffect(() => {
    if (isError) {
      console.log(message);
      
    }
    dispatch(getAllOrders());


    return () => {
      dispatch(resetOrderDetails())
    }
    
  }, [isError, message, dispatch]
);

const handleOnClick=(orderId)=>{
      console.log(orderId);
      dispatch(getOrderDetails(orderId))
      navigate(`/adminDashboard/order/${orderId}`)
}
  return (
    <>
    
    <section className='p-2'>
    <ul role="list" className="divide-y divide-gray-100">
      {orderList.map((order) => (
        <li key={order} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img alt="" src={order.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{order.userName}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">Order Number: #{order._id}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{order.role}</p>
            <button onClick={() => handleOnClick(order._id)}>See Details</button>  
          </div>
        </li>
      ))}
    </ul>
    </section>
    </>
  )
}


export default Dashboard
