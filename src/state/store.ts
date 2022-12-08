import { configureStore } from "@reduxjs/toolkit";
import api, { API_STORE_KEY, reducer as apiReducer } from "./api";
import booksReducer, { BOOKS_STORE_NS } from "./books.slice";
import sessionReducer, { SESSION_STORE_NS } from "./session.slice";

const STORAGE_KEY = "book-store";
export const store = configureStore({
  reducer: {
    [API_STORE_KEY]: apiReducer,
    [BOOKS_STORE_NS]: booksReducer,
    [SESSION_STORE_NS]: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(() => {
  const stateToStore = JSON.parse(JSON.stringify(store.getState()));
  process.env.NODE_ENV === "production" && delete stateToStore[API_STORE_KEY];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
