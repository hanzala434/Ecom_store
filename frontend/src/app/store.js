import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product/productSlice'
import categoryReducer from '../features/category/categorySlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import addressReducer from '../features/address/addressSlice'

export const store = configureStore({
    reducer: {
      auth:authReducer,
      products:productReducer,
      category:categoryReducer,
      cart:cartReducer,
      order:orderReducer,
      address:addressReducer

    },
  })