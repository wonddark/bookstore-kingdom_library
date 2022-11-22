import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const API_STORE_KEY = "api";
const api = createApi({
  reducerPath: API_STORE_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.itbook.store/1.0/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "new",
      }),
    }),
    searchBooks: builder.query({
      query: ({ query, page }: { query: string; page: number }) => ({
        url: `search/${query}/${page}`,
      }),
    }),
    getBookDetails: builder.query({
      query: (isbn: string) => ({
        url: `books/${isbn}`,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useLazySearchBooksQuery,
  useSearchBooksQuery,
  useLazyGetBookDetailsQuery,
} = api;
export const { reducer } = api;

export default api;
