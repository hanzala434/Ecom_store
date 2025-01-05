import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSingleCategory } from '../features/category/categorySlice';
import { useDispatch } from 'react-redux';
import { fetchProduct, fetchProducts } from '../features/product/productSlice';

const ProductItem = ({products}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleProductClick = async () => {

      // Navigate to the vendor profile page
      dispatch(fetchProduct(products._id));
      navigate(`/product/${products._id}`);
    };
  return (
<>
<div className='rounded-2xl shadow-xl p-2'>
<a onClick={handleProductClick}  key={products.id} className="group">
              <img
                src={products.images[0]}
                className="aspect-square w-full rounded bg-white object-contain group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <div className='p-2'>
              <h3 className="mt-4 text-sm text-gray-700 max-lg:text-xl ">{products.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900 max-lg:text-xl">{products.price}</p>
              </div>
            </a>
</div>
</>
  )
}

export default ProductItem
