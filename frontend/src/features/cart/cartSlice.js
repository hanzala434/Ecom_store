import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

// Initial state
const initialState = {
    cart: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Async thunks for cart operations

// Fetch cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, thunkAPI) => {
    try {
        return await cartService.getCart(userId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Add to cart
export const addCartItem = createAsyncThunk('cart/addCartItem', async (cartItem, thunkAPI) => {
    try {
        return await cartService.addToCart(cartItem);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Update cart item
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (updatedItem, thunkAPI) => {
    try {
        return await cartService.updateCartItem(updatedItem);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Remove from cart
export const removeCartItem = createAsyncThunk('cart/removeCartItem', async ({userId,id}, thunkAPI) => {
    try {
        console.log({userId,id});
        return await cartService.removeFromCart(userId,id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// // Clear cart
// export const clearCart = createAsyncThunk('cart/clearCart', async (userId, thunkAPI) => {
//     try {
//         return await cartService.clearCart(userId);
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
//     }
// });

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => {
            state.cart = [];
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart=action.payload.data;
                state.isSuccess = true;
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            
            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(removeCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.cart;
              })
              .addCase(removeCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cart = [];
              })
              .addCase(updateCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload?.cart) {
                  state.cart = action.payload.cart; // Correctly update the cart state
                } else {
                  state.message = 'Invalid cart data received';
                }
              })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'An error occurred';
            });
            
  
    },
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
