import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const {user}=useSelector((state)=>state.auth)
  const id=useSelector((state)=>state.auth.user._id)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name:user.name,
    email:user.email,
    address:user.address,
    phone:user.phone,
  });

  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleSave = () => {
    setEditingField(null);
  };

  const handleSubmit=()=>{
    console.log(formData)
    console.log(id)
    dispatch(updateUser({formData,id}))
    navigate('/your-profile')

  }

  return (
   <>
   <section className='mt-20 m-2 p-4'>
   <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Editable Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((field) => (
          <div key={field} className="flex items-center space-x-4">
            <label className="w-24 font-medium capitalize" htmlFor={field}>
              {field}:
            </label>
            {editingField === field ? (
              <input
              type={field === 'password' && editingField === 'password' ? 'text' : 'text'}
              id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="flex-grow p-2 border rounded focus:outline-none focus:ring focus:ring-green-400"
              />
            ) : (
              <span className="flex-grow text-gray-700">{formData[field]}</span>
            )}
            {editingField === field ? (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleEditClick(field)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}
          </div>
        ))}
        <div className='bg-blue-800 text-white rounded flex justify-center m-auto w-52 p-2 hover:bg-blue-700'>
        <button type='submit'>
          Add Changes
        </button>
        </div>
      </form>
    </div>
   </section>
   </>
  )
}

export default EditProfile
