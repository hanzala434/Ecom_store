import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategory,fetchSingleCategory,reset } from '../features/category/categorySlice';
import { fetchProduct, fetchProducts } from '../features/product/productSlice';


const AdminProductList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {id}=useParams()

  const { products,isError, message } = useSelector((state) =>
    state.products,
    
  );


  useEffect(() => {
    if (isError) {
      console.log(message);
      
    }
    dispatch(fetchProducts(id));


    return () => {
      dispatch(reset())
    }
    
  }, [isError, message, dispatch]
);

const handleOnClick=(id)=>{
      console.log(id);
      dispatch(fetchProduct(id))
      navigate('/')
}

  return (
    <>
     <section className='p-4 mt-5 m-4'>
    <ul role="list" className="divide-y divide-gray-100">
      {products.map((product) => (
        <li key={product} className="flex justify-between gap-x-6 py-5">
          <div onClick={() => handleOnClick(product._id)} className="flex min-w-0 gap-x-4">
            <img alt="" src={product.images[0]} className="size-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{product.name}</p>
            </div>
          </div >
           <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p>${product.price}</p>
            {/* <button  onClick={() => handleOnClick(product._id)} >Add New Product</button>   */}
          </div>
        </li>
      ))}
    </ul>
    <div className='flex justify-center w-full h-10'>
        <button onClick={()=>{navigate(`/add-product/${id}`)}} className='bg-black rounded-full text-xl text-white p-2 '>Add New Product</button>
    </div>
    </section>
    </>
  )
}

export default AdminProductList
