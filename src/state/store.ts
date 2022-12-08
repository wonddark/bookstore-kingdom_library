import { configureStore } from "@reduxjs/toolkit";
import api, { API_STORE_KEY, reducer as apiReducer } from "./api";
import booksReducer, { BOOKS_STORE_NS } from "./books.slice";
import sessionReducer, { SESSION_STORE_KEY } from "./session.slice";
import apiCart, {
  API_CART_STORE_KEY,
  reducer as apiCartReducer,
} from "./api-cart";

const STORAGE_KEY = "book-store";
const persistedState = (() => {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (rawState) {
      const parsed = JSON.parse(rawState);
      delete parsed[API_STORE_KEY];
      delete parsed[API_CART_STORE_KEY];
      return parsed;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
})();
export const store = configureStore({
  reducer: {
    [API_STORE_KEY]: apiReducer,
    [BOOKS_STORE_NS]: booksReducer,
    [SESSION_STORE_KEY]: sessionReducer,
    [API_CART_STORE_KEY]: apiCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(apiCart.middleware),
  preloadedState: persistedState,
});

store.subscribe(() => {
  const stateToStore = JSON.parse(JSON.stringify(store.getState()));
  process.env.NODE_ENV === "production" && delete stateToStore[API_STORE_KEY];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
