import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBooksQuery, useSearchBooksQuery } from "../state/api";

function useBookData() {
  const [data, setData] = useState([]);
  const [shouldPaginate, setShouldPaginate] = useState({
    state: false,
    canGoBackward: false,
    canGoForward: false,
  });
  const [readSearchParams] = useSearchParams();
  const query = readSearchParams.get("query") || "";
  const page = Number(readSearchParams.get("page")) || 1;
  const { data: newBooks, isLoading: loadingNewBooks } = useGetBooksQuery(
    {},
    { skip: Boolean(query) }
  );
  const { data: searchResults, isLoading: loadingSearchResults } =
    useSearchBooksQuery({ query, page }, { skip: query === null });
  const loadData = () => {
    if (query) {
      if (!loadingSearchResults && searchResults) {
        setData(searchResults.books);
        const canGoBackward = Number(searchResults.page) > 1;
        const canGoForward =
          searchResults.total >
          (Number(searchResults.page) - 1) * 10 + searchResults.books.length;
        setShouldPaginate({
          state: canGoBackward || canGoForward,
          canGoBackward,
          canGoForward,
        });
      }
    } else if (!loadingNewBooks) {
      newBooks && setData(newBooks.books);
    }
  };
  useEffect(loadData, [
    loadingNewBooks,
    loadingSearchResults,
    newBooks,
    searchResults,
    query,
  ]);

  return {
    data,
    shouldPaginate,
    isLoading: loadingNewBooks || loadingSearchResults,
  };
}

export default useBookData;
