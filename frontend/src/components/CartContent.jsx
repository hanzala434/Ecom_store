import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem,fetchCart } from '../features/cart/cartSlice';
import {useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'


const CartContent = ({ cartItem }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user._id); // Access userId from Redux state
    const { cart } = useSelector((state) => state.cart);
    const { products } = useSelector((state) => state.products);
    

    function handleUpdateQuantity(getCartItem, typeOfAction) {
      const newQuantity =
        typeOfAction === "plus"
          ? getCartItem.quantity + 1
          : getCartItem.quantity - 1;
    
      if (newQuantity < 1) {
        toast.error("Quantity cannot be less than 1");
        return; // Prevent further execution
      }
    
      dispatch(
        updateCartItem({
          userId,
          color:getCartItem.color,
          size:getCartItem.size,
          productId: getCartItem.productId,
          quantity: newQuantity,
        })
      )
        .unwrap()
        .then(() => dispatch(fetchCart(userId)));
    }
    
    
      // Remove item from cart
      const handleRemoveProduct = (id) => {
        console.log(id); // Confirm that you're passing the correct product ID
        dispatch(removeCartItem({userId, id} ))
        .then(() => dispatch(fetchCart(userId))); // Make sure the payload contains the necessary data
      };
      
  return (
    <ul>
      {cartItem.map((item) => (
        <li key={item.productId} className="flex py-6">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={item.image[0]} // Access the first image in the array
              alt={item.name} // Use product name as alt text
              className="h-full w-full object-cover"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>{item.name}</h3> {/* Access product name */}
                <p className="ml-4">${item.price.toFixed(2)}</p> {/* Access price */}
              </div>
              <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="mt-4 flex items-center">
              <button
                // Add onClick handler for quantity decrease
                onClick={() => handleUpdateQuantity(item, "minus")}

                className="px-2 py-1 text-gray-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                // Add onClick handler for quantity increase
                onClick={() => handleUpdateQuantity(item, "plus")}

                className="px-2 py-1 text-gray-500 border border-gray-300 rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <div className="mt-4 flex flex-1 items-end justify-between text-sm">
              <button
                type="button"
                // Add onClick handler for remove item
                onClick={() => handleRemoveProduct(item._id)}

                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartContent;
