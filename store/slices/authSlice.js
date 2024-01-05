import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
  refresh_token: null,
  id: null,
  image: null,
  full_name: null,
  roles: null,
  isAuthenticated: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.id = action.payload.id
      state.image = action.payload.image
      state.full_name = action.payload.full_name
      state.roles = action.payload.roles
      state.isAuthenticated = true
    },
    logout(state) {
      state.access_token = null
      state.refresh_token = null
      state.id = null
      state.image = null
      state.full_name = null
      state.roles = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
