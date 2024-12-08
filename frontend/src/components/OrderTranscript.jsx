import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetails,resetOrderDetails } from '../features/order/orderSlice'
import OrderCard from './OrderCard'

const OrderTranscript = () => {
    const dispatch=useDispatch()
    const {id} =useParams()
    const {orderDetails,isError, message}=useSelector((state)=>state.order)
    console.log(orderDetails);
    useEffect(()=>{
        if (isError) {
            console.log(message);
            
          }
          dispatch(getOrderDetails(id))
      
      
          return () => {
            dispatch(resetOrderDetails())
          }
    }, [id,dispatch]);
  return (

    <>
    <section className='mt-24'>
    {orderDetails ? (
        <OrderCard  key={orderDetails._id} orderDetails={orderDetails.data}/>
         ) : (
          <h1>order Not Found</h1>
      
      )}
    </section>
    </>
  )
}

export default OrderTranscript
