import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProduct } from '../features/product/productSlice';

const PopularItem = ({product}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleProductClick = async () => {

      // Navigate to the vendor profile page
      dispatch(fetchProduct(product._id));
      navigate(`/product/${product._id}`);
    };

  return (
   <>
   <div onClick={handleProductClick}  key={product.id} className="group relative">
              <img
                // alt={product.imageAlt}
                src={product.images[0]}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product._id}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
   </>
  )
}

export default PopularItem
