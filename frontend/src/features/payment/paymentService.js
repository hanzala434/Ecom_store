import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/payment`;

// Fetch all payments
const getAllPayments = async (userId) => {
  const response = await axios.get(`${API_URL}/get/${userId}`);
  return response.data;
};

// Fetch payment details
const getPaymentDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response.data)
  return response.data;
};

// Add a new payment
const addPayment = async (paymentData) => {
  console.log(paymentData);
  const response = await axios.post(`${API_URL}/add`, paymentData);
  return response.data;
};

// Delete an payment
const deletePayments = async (userId,paymentId) => {
  const response = await axios.delete(`${API_URL}/delete/${userId}/${paymentId}`);
  return response.data;
};

const paymentService = {
  getAllPayments,
  getPaymentDetails,
  addPayment,
  deletePayments,
};

export default paymentService;
