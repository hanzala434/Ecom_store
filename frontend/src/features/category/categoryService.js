import axios from 'axios';

const API_URL = 'http://localhost:8080/api/category';

// Fetch all category
const getAllCategory = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

// Fetch a single category by ID
const getCategoryById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

// Add a new category
const addCategory = async (categoryData) => {
    const res = await axios.post(API_URL, categoryData);
    return res.data;
};

// Delete a category by ID
const deleteCategory = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return { id };
};

const categoryService = {
    getCategoryById,
    getAllCategory,
    addCategory,
    deleteCategory
};

export default categoryService;
