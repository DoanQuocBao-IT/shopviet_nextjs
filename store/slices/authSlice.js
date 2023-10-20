import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  refreshToken: null,
  image: null,
  fullName: null,
  roles: null,
  isAuthenticated: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.image = action.payload.image
      state.fullName = action.payload.fullName
      state.roles = action.payload.roles
      state.isAuthenticated = true
    },
    logout(state) {
      state.accessToken = null
      state.refreshToken = null
      state.image = null
      state.fullName = null
      state.roles = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer