import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyGetBookDetailsQuery } from "../state/api";

function useBookDetails() {
  const { isbn } = useParams();
  const [, setWrongPath] = useState(false);
  const [getBookDetails, { isLoading, data }] = useLazyGetBookDetailsQuery();
  const navigate = useNavigate();
  const backToList = () => {
    navigate("/books");
  };
  const loadData = () => {
    if (isbn) {
      getBookDetails(isbn);
    } else {
      setWrongPath(true);
    }
  };
  useEffect(loadData, [isbn, getBookDetails]);

  return { backToList, isLoading, data };
}

export default useBookDetails;
