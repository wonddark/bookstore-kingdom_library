import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionState = {
  authenticated: boolean;
  token: string;
  refreshToken: string;
};
const initialState: SessionState = {
  authenticated: false,
  token: "",
  refreshToken: "",
};
export const SESSION_STORE_NS = "session";
const sessionSlice = createSlice({
  name: SESSION_STORE_NS,
  initialState,
  reducers: {
    login: (
      state: SessionState,
      { payload }: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.authenticated = true;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
    },
  },
});

export const { login } = sessionSlice.actions;
export default sessionSlice.reducer;
