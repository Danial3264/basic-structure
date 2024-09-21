import { configureStore } from '@reduxjs/toolkit';
import OrdersReducer from './OrdersSlice';
import ProductReducer from './ProductSlice';


const store = configureStore({
  reducer: {
    orders: OrdersReducer,
    products: ProductReducer,
  },
});

export default store;