  import React, { useEffect } from 'react';
  import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
  import { XMarkIcon } from '@heroicons/react/24/outline';
  import { useSelector, useDispatch } from 'react-redux';
  import { fetchCart, updateCartItem, removeCartItem, clearCart } from '../features/cart/cartSlice';
import CartContent from './CartContent';
import { useNavigate } from 'react-router-dom';

  const ShoppingCart = ({ open, setOpen}) => {
    const userId = useSelector((state) => state.auth.user?._id); // Access userId from Redux state
    const cart = useSelector((state) => state.cart);
    const navigate=useNavigate()

    useEffect(() => {
      if (userId) {
        console.log(`Current userId: ${userId}`);
      }
    }, [userId]);
    const dispatch = useDispatch();

    // Access cart state from Redux
    // Fetch cart on component mount
    // useEffect(() => {
    //   if (userId) {
    //     dispatch(fetchCart(userId));
    //   }
    // }, [userId, dispatch]);

    // Update quantity of a cart item
    const handleClick = async () => {

      // Navigate to the vendor profile page
      dispatch(fetchCart(userId));
      navigate(`/checkout`);
    };

    // Calculate subtotal
    const subtotal = cart?.cart?.data?.items
    ? cart.cart.data.items.reduce((total, product) => total + product.price * product.quantity, 0)
    : 0;


    return (
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel className="pointer-events-auto w-screen max-w-md transform">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping Cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                      <CartContent cartItem={cart?.cart?.data?.items || []} />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        onClick={handleClick}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    );
  };

  export default ShoppingCart;
