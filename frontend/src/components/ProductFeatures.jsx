import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useState,useEffect } from 'react'
import { fetchSingleCategory } from '../features/category/categorySlice'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import { addCartItem, fetchCart } from '../features/cart/cartSlice'; // Import the thunk
import { toast } from 'react-hot-toast'
import { fetchProduct, fetchProducts,reset } from '../features/product/productSlice'


const ProductFeatures = ({product}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user); 
  const[cartItem,setCartItems]=useState([]);

    const [selectedSize, setSelectedSize] = useState();
    const [selectedColor, setSelectedColor] = useState();
    const [cartOpen, setCartOpen] = useState(false); // State to control cart visibility
    useEffect(() => {
      if (product?.sizes) {
        setSelectedSize(product.sizes[0]); // Default to the first size when the product loads
      }
      if (product?.colors) {
        setSelectedColor(product.colors[2]); // Default to the first size when the product loads
      }
    //   dispatch(fetchProduct(id));

    //   return () => {
    //     dispatch(reset())
    //  }
          }, [product,dispatch]);
  
    const reviews = { href: '#', average: 4, totalCount: 117 }
    
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    const handleAddToCart = (e) => {
      e.preventDefault();
      
      if (!user?._id) {
        toast.error('Please log in to add items to your cart');
        return;
      }
    
      const cartItem = {
        
        userId:user._id,
        productId: product._id,
        name:product.name,
        color: selectedColor?.name, // Optional: Use selected color
        size: selectedSize?.name, // Optional: Use selected size
        quantity: 1, // Default quantity to 1, can be customized
      }
      console.log(cartItem);
      // Dispatch the addCartItem thunk
      dispatch(addCartItem(cartItem)).then((data)=>
      {  if(data?.payload?.success){
        dispatch(fetchCart(cartItem.userId))
      }
      }
      
      )

      setCartItems((prevItems) => [...prevItems, cartItem]); // Add item to cart
      setCartOpen(true); // Open the shopping cart
    
    
    }
    
    
    
    
  
  
  return (
    <div>

       <div className="pt-6">
            
 

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
  {/* Main Image */}
  {product.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product image ${index + 1}`}
              className={classNames(
                index === 0 ? 'lg:block' : '',
                'rounded-lg object-cover',
                index === 2 ? 'lg:aspect-[3/4]' : 'lg:aspect-[4/5]'
              )}
            />
          ))}
        </div>

    
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
              </div>
    
              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
    
                {/* Reviews */}
                {/* <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                            'size-5 shrink-0',
                          )}
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div> */}
    
                <form onSubmit={handleAddToCart} className="mt-10">
                  Colors
                  <div>
    
                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {product.colors?.map((color) => (
                          <Radio
                            key={color.name}
                            value={color}
                            className={classNames(
                              'cursor-pointer bg-white text-gray-900 shadow-sm',
                              'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6'
                            )}
                          >
                            <span>{color.name}</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
    
                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Size</h3>
                      {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                      </a> */}
                    </div>
    
                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {product.sizes?.map((size) => (
                          <Radio
                            key={size.name}
                            value={size}
                            disabled={!size.instoke}
                            className={classNames(
                              size.instoke
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                            )}
                          >
                            <span>{size.name}</span>
                            {size.instoke ? (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  stroke="currentColor"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  className="absolute inset-0 size-full stroke-2 text-gray-200"
                                >
                                  <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
    
                  <button
                    type="submit"
                    
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to bag
                  </button>
                </form>
              </div>

              {/* Shopping Cart Dialog */}
              <ShoppingCart open={cartOpen} setOpen={setCartOpen}  />

    
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>
    
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description}</p>
                  </div>
                </div>
    
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
    
                  <div className="mt-4">
                    {/* <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                </div>
    
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>
    
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ProductFeatures
