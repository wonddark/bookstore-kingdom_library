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
  cache: "no-store",
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
  if (
    result.error &&
    // @ts-ignore
    (result.error.status === 401 || result.error.originalStatus === 403)
  ) {
    api.dispatch(logout());
    return Promise.reject("Unauthorized");
  }
  return result;
};
const apiCart = createApi({
  reducerPath: API_CART_STORE_KEY,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["CART"],
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["CART"],
    }),
    postCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "POST",
      }),
      invalidatesTags: ["CART"],
    }),
    postCartItem: builder.mutation({
      query: (args: {
        product: string;
        title: string;
        price: number;
        qty: number;
        subtitle?: string;
        image?: string;
      }) => ({
        url: "/cart/book",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["CART"],
    }),
    deleteCartItem: builder.mutation({
      query: (bookId: string) => ({
        url: `/cart/book/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useGetCartQuery,
  usePostCartItemMutation,
  useDeleteCartItemMutation,
  usePostCartMutation,
} = apiCart;
export const { reducer } = apiCart;
export default apiCart;
