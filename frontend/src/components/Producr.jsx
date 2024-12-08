import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProduct,fetchProducts,reset } from '../features/product/productSlice'
import Spinner from '../components/Spinner'
import ProductFeatures from './ProductFeatures'
import { fetchSingleCategory } from '../features/category/categorySlice'

const Producr = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isError, message, isLoading } = useSelector((state) => state.products);
  console.log(product);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    console.log(id);
    dispatch(fetchProduct(id));
    
    return () => {
      dispatch(reset())
   }
    
  }, [id, dispatch]);


  
  
    
  return (
 <>
  <div className="bg-slate-50 mt-16">
  {product ? (
      <ProductFeatures key={product._id} product={product} />
    ) : (
      <h1>Not Found</h1>
  
  )}
    </div>
 </>
  )
}

export default Producr
