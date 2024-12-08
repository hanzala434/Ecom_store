import axios from "axios";

const API_URL = "http://localhost:8080/api/address";

// Fetch all addresses
const getAllAddresses = async (userId) => {
  const response = await axios.get(`${API_URL}/get/${userId}`);
  return response.data;
};

// Fetch address details
const getAddressDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response.data)
  return response.data;
};

// Add a new address
const addAddress = async (addressData) => {
  console.log(addressData);
  const response = await axios.post(`${API_URL}/add`, addressData);
  return response.data;
};

// Delete an address
const deleteAddress = async (userId,addressId) => {
  const response = await axios.delete(`${API_URL}/delete/${userId}/${addressId}`);
  return response.data;
};

const addressService = {
  getAllAddresses,
  getAddressDetails,
  addAddress,
  deleteAddress,
};

export default addressService;
