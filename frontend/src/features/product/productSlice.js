import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
    products: [], // Array to hold all products
    popularList:[],
    product: null, // Single product (for details or editing)
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async (id, thunkAPI) => {
    try {
        return await productService.getAllProducts(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//fetch popular Products
export const fetchPopularProducts = createAsyncThunk('products/fetchPopular', async (thunkAPI) => {
    try {
        return await productService.getPopularProducts();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Fetch single product
export const fetchProduct = createAsyncThunk('products/fetch', async (id, thunkAPI) => {
    try {
        // const categoryId=thunkAPI.getState().category.categorySingle._id
        console.log(id);
        return await productService.getProductById(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add new product
export const addProduct = createAsyncThunk('products/add', async (productData, thunkAPI) => {
    try {
        const id=thunkAPI.getState().vendor.vendorSingle._id
        return await productService.addProduct(productData,id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete product
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
                state.product=action.null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchPopularProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPopularProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.popularList = action.payload;
                state.product=action.null;
            })
            .addCase(fetchPopularProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = state.products.filter((p) => p._id !== action.payload.id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
