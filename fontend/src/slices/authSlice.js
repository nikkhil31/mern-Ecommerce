import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: window.localStorage.getItem('user')
      ? JSON.parse(window.localStorage.getItem('user'))
      : null,
    token: window.localStorage.getItem('token')
      ? JSON.parse(window.localStorage.getItem('token'))
      : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer
