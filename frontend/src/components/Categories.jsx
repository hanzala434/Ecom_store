import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { fetchCategory,reset } from '../features/category/categorySlice'
import { fetchSingleCategory } from '../features/category/categorySlice'
import CategoryItem from './CategoryItem'

const Categories = () => {
  const dispatch = useDispatch();

  const { category,isError, message } = useSelector((state) =>
    state.category,
    
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      
    }
    dispatch(fetchCategory());

    return () => {
      dispatch(reset())
    }
    
  }, [isError, message, dispatch]
);
  return (
 <>
  <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {category.map((category) => (
              <CategoryItem key={category._id} category={category}/>
            ))}
          </div>
        </div>
      </div>
    </div>
 </>
  )
}

export default Categories
