import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API}/api/product`;

// Fetch all products
const getAllProducts = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

// Fetch popular products
const getPopularProducts = async () => {
    const res = await axios.get(`${API_URL}/popular`);
    console.log(res.data);
    return res.data
};

// Fetch a single product by ID
const getProductById = async (id) => {
    console.log(id);
    const res = await axios.get(`${API_URL}/get/${id}`);
    console.log(res.data);
    return res.data;
};

// Add a new product
const addProduct = async (productData,id) => {
    console.log(productData);
    console.log(id);
    const res = await axios.post(`${API_URL}/create/${id}`, productData);
    console.log(res.data);
    return res.data;
};

// Delete a product by ID
const deleteProduct = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return { id };
};

const productService = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    getPopularProducts
};

export default productService;
