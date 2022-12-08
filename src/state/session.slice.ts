import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type SessionState = {
  authenticating: boolean;
  authenticated: boolean;
  token: string;
  refreshToken: string;
  userId: string;
  preferred_username: string | undefined;
  picture: string | undefined;
  name: string | undefined;
  given_name: string | undefined;
  family_name: string | undefined;
  email: string | undefined;
};
const initialState: SessionState = {
  authenticating: false,
  authenticated: false,
  token: "",
  refreshToken: "",
  userId: "",
  email: undefined,
  family_name: undefined,
  given_name: undefined,
  name: undefined,
  picture: undefined,
  preferred_username: undefined,
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
        preferred_username: string | undefined;
        picture: string | undefined;
        name: string | undefined;
        given_name: string | undefined;
        family_name: string | undefined;
        email: string | undefined;
      }>
    ) => {
      state.authenticated = true;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.userId = payload.userId;
      state.preferred_username = payload.preferred_username;
      state.picture = payload.picture;
      state.name = payload.name;
      state.given_name = payload.given_name;
      state.family_name = payload.family_name;
      state.email = payload.email;
    },
    logout: () => initialState,
    toggleAuthenticating: (state) => {
      state.authenticating = !state.authenticating;
    },
  },
});

export const selectAuthenticated = (state: RootState) =>
  state[SESSION_STORE_KEY].authenticated;
export const selectUserId = (state: RootState) =>
  state[SESSION_STORE_KEY].userId;
export const selectAuthenticating = (state: RootState) =>
  state[SESSION_STORE_KEY].authenticating;

export const { login, logout, toggleAuthenticating } = sessionSlice.actions;
export default sessionSlice.reducer;
