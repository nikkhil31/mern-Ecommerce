import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { eCommerceApi } from '../services/eCommerce'
import authReducer from '../slices/authSlice'
import cartReducer from '../slices/cartSlice'

export const store = configureStore({
  reducer: {
    [eCommerceApi.reducerPath]: eCommerceApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(eCommerceApi.middleware),
})

setupListeners(store.dispatch)
