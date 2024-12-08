import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchProduct } from '../features/product/productSlice';


const CategoryItem = ({category}) => {
    const navigate=useNavigate();

    const handleCategoryClick = async () => {


        // Navigate to the vendor profile page
        navigate(`/category/${category._id}`);
      };
  return (
    <>
    <div key={category.name} className="group relative">
                <img
                  alt={category.imageAlt}
                  src={category.image}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <a onClick={handleCategoryClick}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{category.description}</p>
              </div>
    </>
  )
}

export default CategoryItem
