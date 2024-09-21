import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get("/products");
    return response.data;
  }
);

// Async thunk to delete an product from the backend
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`/products/${productId}`);
      return productId;  // Return the ID of the deleted product
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to update an product in the backend
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      // Append all form fields to FormData
      formData.append('name', updatedProduct.name);
      formData.append('unitPrice', updatedProduct.unitPrice);
      formData.append('shippingCost', updatedProduct.shippingCost);

      // Append image if exists
      if (updatedProduct.image) {
        formData.append('image', updatedProduct.image);
      }

      const response = await axios.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Return the updated product data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// Initial state for the product slice
const initialState = {
  products: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// The product slice
const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
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
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete product';
      })

     // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;  // Update the specific order in the list
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update product';
      });
  },
});

export default ProductSlice.reducer;
