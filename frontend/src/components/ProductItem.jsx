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
<div>
<a onClick={handleProductClick}  key={products.id} className="group">
              <img
                src={products.images[0]}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-sm text-gray-700">{products.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{products.price}</p>
            </a>
</div>
</>
  )
}

export default ProductItem
