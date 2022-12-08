import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationState = {
  location: string;
};
const initialState: LocationState = {
  location: "",
};
export const LOCATION_STORE_KEY = "location";
const locationSlice = createSlice({
  name: LOCATION_STORE_KEY,
  initialState,
  reducers: {
    changeLocation: (
      state: LocationState,
      { payload }: PayloadAction<string>
    ) => {
      state.location = payload;
    },
  },
});

export const { changeLocation } = locationSlice.actions;
export default locationSlice.reducer;
