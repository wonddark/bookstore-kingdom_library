import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type SessionState = {
  authenticated: boolean;
  token: string;
  refreshToken: string;
  userId: string;
};
const initialState: SessionState = {
  authenticated: false,
  token: "",
  refreshToken: "",
  userId: "",
};
export const SESSION_STORE_KEY = "session";
const sessionSlice = createSlice({
  name: SESSION_STORE_KEY,
  initialState,
  reducers: {
    login: (
      state: SessionState,
      {
        payload,
      }: PayloadAction<{
        token: string;
        refreshToken: string;
        userId: string;
      }>
    ) => {
      state.authenticated = true;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.userId = payload.userId;
    },
    logout: () => initialState,
  },
});

export const selectAuthenticated = (state: RootState) =>
  state[SESSION_STORE_KEY].authenticated;
export const selectUserId = (state: RootState) =>
  state[SESSION_STORE_KEY].userId;

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
