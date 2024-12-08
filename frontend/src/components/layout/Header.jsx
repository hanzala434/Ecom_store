import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { FaShoppingBag,FaUser,FaSignInAlt,FaSignOutAlt } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import { logout,reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import EagleNiche from '../../assets/EagleNiche.PNG'
import ShoppingCart from '../ShoppingCart';
import { toast } from 'react-hot-toast'
import { fetchCart } from '../../features/cart/cartSlice';

const Header = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.auth)
  const userId = user?._id;
  const {cart}=useSelector((state)=>state.cart)
  const {category}=useSelector((state)=>state.category)
  const[cartItem,setCartItems]=useState([]);
  const [cartOpen, setCartOpen] = useState(false);

 

  const onLogOut=()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


const navigation = [
  { name: 'About us', href: '/about-us' },
  { name: 'Contact', href: '/contact-us' },
  { name: 'Categories', href: '/category' },
  { name:'Orders',href:`/your-orders/${userId}`}

]

const handleCartClick = (e) => {
  e.preventDefault();
  
  if (!userId) {
    toast.error('Please log in to add items to your cart');
    return;
  }

  // const cartItem = {
    
  //   userId:user._id,
  //   productId: product._id,
  //   name:product.name,
  //   color: selectedColor?.name, // Optional: Use selected color
  //   size: selectedSize?.name, // Optional: Use selected size
  //   quantity: 1, // Default quantity to 1, can be customized
  // }
  // console.log(cartItem);
  // // Dispatch the addCartItem thunk
  // dispatch(addCartItem(cartItem)).then((data)=>
  // {  if(data?.payload?.success){
     dispatch(fetchCart(userId))
  // }
  // }
  
  // )

  setCartItems((prevItems) => [...prevItems, cartItem]); // Add item to cart
  setCartOpen(true); // Open the shopping cart


}


  return (
    <header className="absolute inset-x-0 top-0  z-50 ">
    <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            alt=""
            src={EagleNiche}
            className="h-16 w-auto"
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
            {item.name}
          </a>
        ))}
        

 
{/* <form class="max-w-lg mx-auto">
    <div class="flex">
        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
        {category && category.length > 0 ? (
          category.map((category)=>(
              <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul key={category._id} class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{category.name}</button>
            </li>
            </ul>
            </div>
            )) 
          ) : (
              <p>No Categories available</p>
      
            )}
        <div class="relative w-full">
            <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
            <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>
</form> */}


      </div>
      {user?(    
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <button onClick={onLogOut} className="text-sm/6 font-semibold text-slate-900">
          Logout <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    ):(
      <>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="/register" className="text-sm/6 font-semibold text-gray-900">
        Register-Now
      </a>
    </div>
     <div className="ml-3">
        <a href="/login" className="text-sm/6 font-semibold text-gray-900">
          Log in
        </a>
      </div>
    </>
    )}
    <div class="ml-1 flow-root lg:ml-1">
              <a onClick={handleCartClick} href="#" class="group -m-2 flex items-center p-2">
                <svg class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                <span class="sr-only">items in cart, view bag</span>
              </a>
              <ShoppingCart open={cartOpen} setOpen={setCartOpen}  />

            </div>
    

 
    </nav>
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={EagleNiche}
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {user?(    
     <div className="py-6">
     <button
       onClick={onLogOut}
       className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
     >
       LogOut
     </button>
   </div>
    ):(
      <>
     <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                   Register Now
                  </a>
                </div>
    </>
    )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
  </header>
  )
}
   

export default Header
