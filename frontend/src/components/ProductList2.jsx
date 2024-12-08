import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts,reset } from '../features/product/productSlice'
import { fetchSingleCategory } from '../features/category/categorySlice'
import { useNavigate,useParams } from 'react-router-dom'


import Spinner from '../components/Spinner'
import ProductItem from './ProductItem'


const ProductList2 = () => {
  const dispatch = useDispatch();
  const { id } = useParams();


  const { products,isError, message } = useSelector((state) =>
    state.products,
    
  );
  const { product } = useSelector((state) =>
    state.products,
    
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      
    }
    dispatch(fetchSingleCategory(id));
    dispatch(fetchProducts(id));


    return () => {
      dispatch(reset())
    }
    
  }, [isError, message, dispatch]
);


  
  return (
   <>
    <div className="bg-white mt-16">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((products) => (
            <ProductItem key={products._id} products={products} />
          ))}
        </div>
      </div>
    </div>
   </>
  )
}

export default ProductList2
