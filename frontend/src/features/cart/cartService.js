import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart';

// Fetch the cart for a user
const getCart = async (userId) => {
    const res = await axios.get(`${API_URL}/get/${userId}`);
    return res.data;
};

// Add an item to the cart
const addToCart = async (cartItem) => {
    const res = await axios.post(`${API_URL}/add`, cartItem);
    return res.data;
};

// Update an item in the cart
const updateCartItem = async (updatedItem) => {
    const res = await axios.put(`${API_URL}/update-cart`, updatedItem);
    console.log(res.data);
    return res.data;
};

// Remove an item from the cart
const removeFromCart = async (userId,itemId) => {
    const res = await axios.delete(`${API_URL}/${userId}/${itemId}`);
    console.log(res.data);
    return res.data;
};

const cartService = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    
};

export default cartService;
