import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCategory } from '../features/category/categorySlice';
import axios from 'axios';

const CategoryForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      image: '',
      description: '',
      imageAlt:''
    });
  
    const { name, image,imageAlt, description} = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [selectedFile, setSelectedFile] = useState(null);
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleFileUpload = async () => {
      if (!selectedFile) return;
  
      const formData = new FormData();
      formData.append('myFile', selectedFile, selectedFile.name);
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/upload`, formData);
        const uploadedImagePath = response.data.filePath;
        console.log(uploadedImagePath);
        setFormData((prevState) => ({
          ...prevState,
          image: uploadedImagePath,
        }));
        console.log('Uploaded file:', uploadedImagePath);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const categoryData = {
        name,
        description,
        image,
        imageAlt
      };
  
      console.log(categoryData);
      dispatch(addCategory(categoryData));
    };
  
  return (
    <>
    <section className="mt-24">
        <h1 className="flex justify-center p-2 font-bold">Enter Product Details</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto m-2 p-4">
          {/* Existing Form Fields */}
          {/* Name, Price, Description, Highlights, Details */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500">
              Name
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="description"
              value={description}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500">
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="imageAlt"
              value={imageAlt}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500">
            Image Alternate Text
            </label>
          </div>
          
          {/* Image Upload */}
          <div className="mb-5">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500"
            />
            <button
              type="button"
              onClick={handleFileUpload}
              className="mt-2 bg-blue-700 text-white px-3 py-1 rounded"
            >
              Upload Image
            </button>
            <div className="mt-2">
              
                <span  className="block text-gray-700">
                  {image}
                </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  )
}

export default CategoryForm
