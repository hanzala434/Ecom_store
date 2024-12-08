import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
    category: [], // Array to hold all products
    categorySingle: null, // Single product (for details or editing)
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Fetch all category
export const fetchCategory = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
    try {
        return await categoryService.getAllCategory();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Fetch single category
export const fetchSingleCategory = createAsyncThunk('products/fetch', async (id, thunkAPI) => {
    try {
        return await categoryService.getCategoryById(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add new category
export const addCategory = createAsyncThunk('category/add', async (categoryData, thunkAPI) => {
    try {
        return await categoryService.addCategory(categoryData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete category
export const deleteCategory = createAsyncThunk('category/delete', async (id, thunkAPI) => {
    try {
        return await categoryService.deleteCategory(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const categorySlice = createSlice({
    name: 'category',
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
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchSingleCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categorySingle = action.payload;
            })
            .addCase(fetchSingleCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category = state.category.filter((p) => p._id !== action.payload.id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
