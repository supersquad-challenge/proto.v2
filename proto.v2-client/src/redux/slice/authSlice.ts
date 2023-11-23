import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface IAuthState {
  isLoggedIn: boolean;
  email: null | string;
  nickname: null | string;
  userID: null | string;
  address: null | string;
  isConnected: boolean;
  profile: null | string;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  email: null,
  nickname: null,
  userID: null,
  address: null,
  isConnected: false,
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER_LOGIN: (state, action) => {
      const { email, nickname, userID, profile } = action.payload;

      state.isLoggedIn = true;
      state.email = email;
      state.nickname = nickname;
      state.userID = userID;
      state.profile = profile;
    },
    SET_USER_LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.nickname = null;
      state.userID = null;
      state.address = null;
      state.isConnected = false;
      state.profile = null;
    },
    SET_USER_CONNECT: (state, action) => {
      const { address } = action.payload;

      if (!state.isLoggedIn) return;
      state = { ...state };

      state.isConnected = true;
      state.address = address;
    },
    SET_USER_DISCONNECT: (state) => {
      state = { ...state };

      state.address = null;
      state.isConnected = false;
    },
  },
});

export const {
  SET_USER_LOGIN,
  SET_USER_LOGOUT,
  SET_USER_CONNECT,
  SET_USER_DISCONNECT,
} = authSlice.actions;

export const getIsLoggedInState = (state: RootState) => state.auth.isLoggedIn;
export const getEmailState = (state: RootState) => state.auth.email;
export const getNicknameState = (state: RootState) => state.auth.nickname;
export const getUserIDState = (state: RootState) => state.auth.userID;
export const getAddressState = (state: RootState) => state.auth.address;
export const getIsConnectedState = (state: RootState) => state.auth.isConnected;
export const getProfileState = (state: RootState) => state.auth.profile;
export const getAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
