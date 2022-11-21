import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "./api";
import { RootState } from "./store";

type BooksState = {
  paginate: boolean;
  page: number;
  query: string;
  searching: boolean;
};
const initialState: BooksState = {
  paginate: false,
  page: 1,
  query: "",
  searching: false,
};
export const BOOKS_STORE_NS = "books";
const booksSlice = createSlice({
  name: BOOKS_STORE_NS,
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getBooks.matchFulfilled, (state) => {
      state.paginate = false;
      state.page = 1;
      state.searching = false;
      state.query = "";
    });
    builder.addMatcher(
      api.endpoints.searchBooks.matchFulfilled,
      (state, { payload }) => {
        state.paginate = Number(payload.total) > payload.books.length - 1;
        state.page = Number(payload.page);
        state.searching = true;
      }
    );
  },
});

export const selectPaginate = (state: RootState) =>
  state[BOOKS_STORE_NS].paginate;
export const selectPage = (state: RootState) => state[BOOKS_STORE_NS].page;
export const selectSearching = (state: RootState) =>
  state[BOOKS_STORE_NS].searching;
export const selectQuery = (state: RootState) => state[BOOKS_STORE_NS].query;

export const { setQuery, setPage } = booksSlice.actions;
export default booksSlice.reducer;
