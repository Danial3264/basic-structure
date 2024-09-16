import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }
);

// Initial state for the product slice
const initialState = {
  products: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// The product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer to add a new product
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    // Reducer to update an existing product
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    // Reducer to remove a product
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the action creators and reducer
export const { addProduct, updateProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
