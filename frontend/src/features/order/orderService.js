import axios from "axios";

const API_URL = "http://localhost:8080/api/order";

// Create a new order
const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/create`, orderData);
  return response.data;
};

// Capture payment
const capturePayment = async (paymentId, payerId, orderId) => {
  const response = await axios.post(`${API_URL}/capture`, {
    paymentId,
    payerId,
    orderId,
  });
  return response.data;
};

// Get all orders by user ID
const getAllOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/list/${userId}`);
  console.log(response.data)
  return response.data;
};

// Get all orders
const getAllOrdersAdmin = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

// Get order details
const getOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_URL}/details/${orderId}`);
  return response.data;
};

const orderService = {
  createOrder,
  capturePayment,
  getAllOrders,
  getOrderDetails,
  getAllOrdersAdmin
};

export default orderService;
