import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner';
import { addNewAddress } from '../features/address/addressSlice';
import { toast } from 'react-hot-toast'

const AddressFrom = () => {
        // const { cart } = useSelector((state) => state.cart.cart);
        const userId = useSelector((state) => state.auth.user._id); // Access userId from Redux state

        const [formData,setFormData]=useState({
          userId:userId,
          address:'',
          city:'',
          pincode:'',
          phone:'',
          notes:'',
         })
      
         const {address,phone,pincode,notes,city}=formData
         const navigate=useNavigate()
         const dispatch=useDispatch()
      
         
     
         
      const onChange=(e)=>{
          setFormData((prevState)=>({
             ...prevState,
             [e.target.name]:e.target.value,
          }))
      }
      
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const addressData={
          userId,
          address,
          city,
          pincode,
          phone,
          notes
      }
        console.log(addressData);
        dispatch(addNewAddress(addressData))
        };
      
        // if(isLoading){
        //   return <Spinner/>
        // }
  return (
   <>
   <section className='mt-24'>
  <h1 className='flex justify-center p-2 font-bold'>Enter Your Address Details</h1>
<form onSubmit={handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="address" value={address} onChange={onChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" className="peer-focus:font-medium absolute text-sm
       text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
       top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
       rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
       peer-focus:-translate-y-6">Address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="city" value={city} onChange={onChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="phone" value={phone} onChange={onChange} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="pincode" value={pincode} onChange={onChange} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PinCode</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="notes" value={notes} onChange={onChange} id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notes</label>
    </div>
  
   
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</section>
   </>
  )
}

export default AddressFrom
