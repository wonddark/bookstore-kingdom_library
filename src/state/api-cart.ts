import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "./store";
import { logout, SESSION_STORE_KEY } from "./session.slice";

export const API_CART_STORE_KEY = "api-cart";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bookstore-api.gyfted.dev/api",
  mode: "cors",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)[SESSION_STORE_KEY].token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
    }
    return headers;
  },
});
const baseQueryWithLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    return Promise.reject("Unauthorized");
  }
  return result;
};
const apiCart = createApi({
  reducerPath: API_CART_STORE_KEY,
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
      }),
    }),
  }),
});

export const { useGetCartQuery } = apiCart;
export const { reducer } = apiCart;
export default apiCart;
