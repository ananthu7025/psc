import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedFalse: null,
    userToken: null,
    userData: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedFalse = false;
      state.userData = action.payload.user;
    },
    updateUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.isLoggedFalse = action.payload;
      state.userData = null; 
    },
    clearUserData: (state, action) => {
      state.userData = {};
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserToken, updateUserData, clearUserData } = authSlice.actions;

export default authSlice.reducer;
