import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBooksQuery, useSearchBooksQuery } from "../state/api";

function useBookData() {
  const [data, setData] = useState([]);
  const [shouldPaginate, setShouldPaginate] = useState(false);
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
        setShouldPaginate(searchResults.total > searchResults.books.length - 1);
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
