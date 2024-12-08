import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getAddressDetails, getAllAddresses,resetAddressState } from '../features/address/addressSlice'
import OrderAdress from './OrderAdress'
import { Spinner } from 'react-bootstrap'
import { fetchCart } from '../features/cart/cartSlice'
import { createNewOrder } from '../features/order/orderSlice'

const OrderDetail = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userId = useSelector((state) => state.auth.user._id); // Access userId from Redux state
  const user=useSelector((state)=>state.auth.user);
  const {id}=useParams()
  const { cart } = useSelector((state) =>state.cart);
  const { addressDetails,isError,message } = useSelector((state) =>state.address);

   console.log(addressDetails)
  useEffect(() => {
    if (isError) {
      console.log(message);
      
    }
     dispatch(getAddressDetails(id));
     dispatch(fetchCart(userId))
     
    return () => {
       dispatch(resetAddressState())
    }
    
  },  [id, dispatch]);

  const subtotal = cart?.data?.items
  ? cart.data.items.reduce((total, product) => total + product.price * product.quantity, 0)
  : 0;

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const orderData = {
      userId: userId,
      cartId: cart?._id,
      userName:user.name,
      cartItems: cart.data?.items.map((singleCartItem) => ({
        name: singleCartItem?.name,
        productId: singleCartItem?.productId,
        color: singleCartItem?.color,
        size: singleCartItem?.size,
        price:singleCartItem?.price,
        image:singleCartItem?.image[0],
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: addressDetails?._id,
        address: addressDetails?.address,
        city: addressDetails?.city,
        pincode: addressDetails?.pincode,
        phone: addressDetails?.phone,
        notes: addressDetails?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: subtotal,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log(orderData);
    dispatch(createNewOrder(orderData ))
    };


  
  return (
  <>
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <form onSubmit={handleSubmit} class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-3xl">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>
      <div>
        {addressDetails ? (
          <OrderAdress key={addressDetails._id} addressDetails={addressDetails} />
            ) : (
      <h1>Not Found</h1>
       )}
       </div>

  <div class="mt-6 sm:mt-8">
      {cart?.data?.items?.length > 0 ? (
          cart.data.items.map((item) => (
         <div class="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
          <table class="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td class="whitespace-nowrap py-4 md:w-[384px]">
                  <div class="flex items-center gap-4">
                    <a href="#" class="flex items-center aspect-square w-10 h-10 shrink-0">
                      <img class="h-auto w-full max-h-full dark:hidden" src={item.image[0]} />
                      <img class="hidden h-auto w-full max-h-full dark:block" src={item.image[0]} />
                    </a>
                    <a href="#" class="hover:underline">{item.name}</a>
                  </div>
                </td>

                <td class="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.quantity}</td>

                <td class="p-4 text-right text-base font-bold text-gray-900 dark:text-white">{item.price}</td>
              </tr>

            </tbody>
          </table>
        </div> ))
        ):(
        <p className="text-base text-gray-500 dark:text-gray-400">
       Unable to load cart items
      </p>
      )
}

        <div class="mt-4 space-y-6">
          <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-gray-500 dark:text-gray-400">Sub-Total price</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-gray-500 dark:text-gray-400">Delivery</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">$0.00</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">$0.00</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-lg font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
            </dl>
          </div>

          <div class="flex items-start sm:items-center">
            <input id="terms-checkbox-2" type="checkbox" value="" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
            <label for="terms-checkbox-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> I agree with the <a href="#" title="" class="text-primary-700 underline hover:no-underline dark:text-primary-500">Terms and Conditions</a> of use of the EcomStore </label>
          </div>

          <div class="gap-4 sm:flex sm:items-center">

            <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg bg-slate-900  px-5 py-2.5 text-sm font-medium text-slate-50 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Send the order</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</section>
  </>
  )
}

export default OrderDetail
