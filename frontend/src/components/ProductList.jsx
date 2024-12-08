import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularProducts,reset } from '../features/product/productSlice'
import PopularItem from './PopularItem'

const ProductList = () => {
  const dispatch=useDispatch()
  const {popularList,isError,message}=useSelector((state)=>state.products)
  console.log(popularList);
  useEffect(()=>{
    if (isError) {
      console.log(message);
      
    }
    dispatch(fetchPopularProducts())


    return () => {
      dispatch(reset())
    }
  },[dispatch]);


  return (
  <>
  <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Popular Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {popularList && popularList.length > 0 ? (
            popularList.map((product) => (
              <PopularItem key={product._id} product={product} />
            ))
          ) : (
            <p>No popular products available</p>
          )}
        </div>
      </div>
    </div>
  </>
  )
}

export default ProductList
