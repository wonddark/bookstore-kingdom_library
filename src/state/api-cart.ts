import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "./store";
import { SESSION_STORE_KEY } from "./session.slice";

export const API_CART_STORE_KEY = "api-cart";
const apiCart = createApi({
  reducerPath: API_CART_STORE_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookstore-api.gyfted.dev/api/cart",
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "Authorization",
        `Bearer ${(getState() as RootState)[SESSION_STORE_KEY].token}`
      );
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useGetCartQuery } = apiCart;
export const { reducer } = apiCart;
export default apiCart;
