import { configureStore } from "@reduxjs/toolkit";
import api, { API_STORE_KEY, reducer as apiReducer } from "./api";
import booksReducer, { BOOKS_STORE_NS } from "./books.slice";

export const store = configureStore({
  reducer: {
    [API_STORE_KEY]: apiReducer,
    [BOOKS_STORE_NS]: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
