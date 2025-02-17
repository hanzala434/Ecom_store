import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

// Initial state
const initialState = {
  payments: [],
  paymentDetails: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Async thunks

// Fetch all payments
export const getAllPayments = createAsyncThunk(
  "address/getAllPayments",
  async (userId, thunkAPI) => {
    try {
      return await paymentService.getAllPayments(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// // Fetch payment details
export const getPaymentDetails = createAsyncThunk(
  "address/getPaymentDetails",
  async (id, thunkAPI) => {
    try {
      return await paymentService.getPaymentDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a new payment
export const addPayment = createAsyncThunk(
  "address/addPayment",
  async (paymentData, thunkAPI) => {
    try {
      return await paymentService.addAddress(paymentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete an address
export const deletePayments = createAsyncThunk(
  "payment/deletePayments",
  async (userId,paymentId, thunkAPI) => {
    try {
      return await paymentService.deletePayments(userId,paymentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.paymentDetails = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPaymentDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentDetails = action.payload;
      })
      .addCase(getPaymentDetails.rejected, (state, action) => {
        state.isLoading = false; 
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addresses=action.payload;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payments = state.payments.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deletePayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
