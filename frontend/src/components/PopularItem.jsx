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
   <div onClick={handleProductClick}  key={product.id} className="group relative rounded-2xl p-2 shadow-xl">
              <img
                // alt={product.imageAlt}
                src={product.images[0]}
                className="aspect-square w-full rounded-md bg-white object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between p-2">
                <div>
                  <h3 className="text-xl text-gray-700 max-lg:text-xl">
                    <a href={product._id}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900 max-lg:text-xl">{product.price}</p>
              </div>
            </div>
   </>
  )
}

export default PopularItem
