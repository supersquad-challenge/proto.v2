import { createSlice } from "@reduxjs/toolkit";
import { RootState } from  "@/redux/store"

interface IAuthState {
  isLoggedIn: boolean;
  email: null | string;
  userName: null | string;
  userID: null | string;
  address: null | string;
  isConnected: boolean;
  profile: null | string;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
  address: null,
  isConnected: false,
  profile: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USER_LOGIN: (state, action) => {
      const { email, userName, userID, address, profile } = action.payload;

      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.address = address;
      state.isConnected = false;
      state.profile = profile
    },
    SET_USER_LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.address = null;
      state.isConnected = false;
      state.profile = null;
    },
    SET_USER_CONNECT: (state, action) => {
      const { address } = action.payload;

      if (!state.isLoggedIn)
        return ;
      state = {...state}

      state.isConnected = true;
      state.address = address;
    },
    SET_USER_DISCONNECT: (state) => {
      state = {...state}

      state.address = null;
      state.isConnected = false;
    }
  }
})

export const { 
  SET_USER_LOGIN, 
  SET_USER_LOGOUT, 
  SET_USER_CONNECT,
  SET_USER_DISCONNECT 
} = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserID = (state: RootState) => state.auth.userID;
export const selectAddress = (state: RootState) => state.auth.address;
export const selectIsConnected = (state: RootState) => state.auth.isConnected;
export const selectProfile = (state: RootState) => state.auth.profile;


export default authSlice.reducer;