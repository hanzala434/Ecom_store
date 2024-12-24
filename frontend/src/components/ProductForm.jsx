import React, { useState } from 'react';
import { addProduct } from '../features/product/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ProductForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    colors: [],
    images: [],
    sizes: [],
    description: '',
    highlights: '',
    details: '',
    popular: 'false',
  });

  const { name, price, sizes, colors, description, highlights, details, images, popular } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentColor, setCurrentColor] = useState({ name: ''});
  const [currentSize, setCurrentSize] = useState({ name: '', instoke: true });
  const [selectedFile, setSelectedFile] = useState(null);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddColor = () => {
    if (currentColor.name.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        colors: [...prevState.colors, currentColor],
      }));
      setCurrentColor({ name: ''});
    }
  };

  const handleAddSize = () => {
    if (currentSize.name.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        sizes: [...prevState.sizes, currentSize],
      }));
      setCurrentSize({ name: '', instoke: true });
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('myFile', selectedFile, selectedFile.name);

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData);
       const uploadedImagePath = response.data.filePath;
      console.log(uploadedImagePath);
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, uploadedImagePath],
      }));
      console.log('Uploaded file:', uploadedImagePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      highlights,
      details,
      colors,
      sizes,
      popular,
      images,
    };

    console.log(productData);
    console.log(id);
    dispatch(addProduct({productData,id}));
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
              name="price"
              value={price}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500">
              Price
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
              name="highlights"
              value={highlights}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500">
              Highlights
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              value={details}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500">
              Details
            </label>
          </div>
          
          <div className="mb-5">
          <input
            type="text"
            value={currentColor.name}
            onChange={(e) => setCurrentColor({ ...currentColor, name: e.target.value })}
            placeholder="Enter Color"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="mt-2 bg-blue-700 text-white px-3 py-1 rounded"
          >
            Add Color
          </button>
          <div className="mt-2">
            {colors.map((c, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 mr-2 rounded">
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-5">
          <input
            type="text"
            value={currentSize.name}
            onChange={(e) => setCurrentSize({ ...currentSize, name: e.target.value })}
            placeholder="Enter Size"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-b-2 border-gray-300"
          />
          <label>
            <input
              type="checkbox"
              checked={currentSize.instoke}
              onChange={(e) => setCurrentSize({ ...currentSize, instoke: e.target.checked })}
              className="mr-2"
            />
            In Stock
          </label>
          <button
            type="button"
            onClick={handleAddSize}
            className="mt-2 bg-blue-700 text-white px-3 py-1 rounded"
          >
            Add Size
          </button>
          <div className="mt-2">
            {sizes.map((s, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 mr-2 rounded">
                {s.name} ({s.inStock ? 'In Stock' : 'Out of Stock'})
              </span>
            ))}
          </div>
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
              {images.map((img, index) => (
                <span key={index} className="block text-gray-700">
                  {img}
                </span>
              ))}
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
  );
};

export default ProductForm;
