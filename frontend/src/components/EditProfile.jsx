import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const {user}=useSelector((state)=>state.auth)
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

  return (
   <>
   <section className='mt-20'>
   <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Editable Profile</h1>
      <form className="space-y-4">
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
      </form>
    </div>
   </section>
   </>
  )
}

export default EditProfile
