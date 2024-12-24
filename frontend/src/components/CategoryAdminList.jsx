import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategory,fetchSingleCategory,reset } from '../features/category/categorySlice';

const CategoryAdminList = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
  
  
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
  
  const handleOnClick=(id)=>{
        console.log(id);
        dispatch(fetchSingleCategory(id))
        navigate('/')
  }
  const handleOnClick2=(id)=>{
    console.log(id);
    dispatch(fetchSingleCategory(id))
    navigate(`/add-product/${id}`)
}
  return (
    <>
    <section className='p-4 mt-5 m-4'>
    <ul role="list" className="divide-y divide-gray-100">
      {category.map((category) => (
        <li key={category} className="flex justify-between gap-x-6 py-5">
          <div onClick={() => handleOnClick(category._id)} className="flex min-w-0 gap-x-4">
            <img alt="" src={category.image} className="size-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{category.name}</p>
            </div>
          </div >
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            {/* <p className="text-sm/6 text-gray-900">{order.role}</p> */}
            {/* <button onClick={() => handleOnClick2(category._id)} >Add New Product</button>   */}
            <button onClick={() => {navigate(`/admin-products/${category._id}`)}} >See All the Products</button>  

          </div>
        </li>
      ))}
    </ul>
    <div className='flex justify-center w-full h-10'>
        <button onClick={()=>{navigate('/add-category')}} className='bg-black rounded-full text-xl text-white p-2 '>Add New Category</button>
    </div>
    </section>
    </>
  )
}

export default CategoryAdminList
