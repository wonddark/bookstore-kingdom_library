import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyGetBookDetailsQuery } from "../state/api";

function useBookDetails() {
  const { isbn } = useParams();
  const [, setWrongPath] = useState(false);
  const [getBookDetails, { isLoading, data }] = useLazyGetBookDetailsQuery();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const backToList = () => {
    navigate({ pathname: "/books", search: search.toString() });
  };
  const loadData = () => {
    if (isbn) {
      getBookDetails(isbn);
    } else {
      setWrongPath(true);
    }
  };
  useEffect(loadData, [isbn, getBookDetails]);

  return { backToList, isLoading, data, isbn };
}

export default useBookDetails;
