import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "./addressService";

// Initial state
const initialState = {
  addresses: [],
  addressDetails: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Async thunks

// Fetch all addresses
export const getAllAddresses = createAsyncThunk(
  "address/getAllAddresses",
  async (userId, thunkAPI) => {
    try {
      return await addressService.getAllAddresses(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// // Fetch address details
export const getAddressDetails = createAsyncThunk(
  "address/getAddressDetails",
  async (id, thunkAPI) => {
    try {
      return await addressService.getAddressDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a new address
export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (addressData, thunkAPI) => {
    try {
      return await addressService.addAddress(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete an address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (userId,addressId, thunkAPI) => {
    try {
      return await addressService.deleteAddress(userId,addressId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddressState: (state) => {
      state.addressDetails = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addresses = action.payload;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddressDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddressDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addressDetails = action.payload;
      })
      .addCase(getAddressDetails.rejected, (state, action) => {
        state.isLoading = false; 
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addresses.push(action.payload);
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAddressState } = addressSlice.actions;

export default addressSlice.reducer;
