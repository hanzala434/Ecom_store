import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllOrdersByUserId, resetOrderDetails } from '../features/order/orderSlice'
import RecentOrderCard from './RecentOrderCard'

const UserOrders = () => {
    const dispatch=useDispatch()
    const userId=useSelector((state)=>state.auth.user._id)
    const {orderList,isError,message}=useSelector((state)=>state.order)
    useEffect(()=>{
        if(isError){
            console.log(message)
            return
        }
        dispatch(getAllOrdersByUserId(userId))

        return () => {
            dispatch(resetOrderDetails())
          }

    },[dispatch])
  return (
    <>
    <section className='mt-20'>
        <div className='flex m-4 p-4 justify-center'>
        {orderList && orderList?.length>0?(
            orderList?.map((order)=>(
                <RecentOrderCard key={order._id} order={order}/>
           ) 
        )):(
            <p>You haven't ordered yet</p>
           )
}
        </div>
    </section>
    </>
  )
}

export default UserOrders
