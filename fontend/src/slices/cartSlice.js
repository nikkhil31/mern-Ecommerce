import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: window.localStorage.getItem('cart')
      ? JSON.parse(window.localStorage.getItem('cart'))
      : {},
  },
  reducers: {
    addToCart: (state, action) => {
      if (action.payload.quantity > 0) {
        state.cart[action.payload._id] = action.payload
      } else {
        delete state.cart[action.payload._id]
      }

      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    clearCart: (state, action) => {
      state.cart = {}
      window.localStorage.removeItem('cart')
    },
  },
})

export const { addToCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
