import { useGetBooksQuery, useSearchBooksQuery } from "../../state/api";
import BookItem from "../widgets/BookItem";
import SearchForm from "../widgets/SearchForm";
import { useEffect, useState } from "react";
import Pagination from "../widgets/Pagination";
import { useSearchParams } from "react-router-dom";

function BooksHome() {
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
  return (
    <div className="container py-2">
      <div className="row mt-4">
        <div className="col-12 col-md-9 col-xl-7 mx-auto">
          <SearchForm />
        </div>
      </div>
      {shouldPaginate && <Pagination />}
      <div
        className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 books-list${
          shouldPaginate ? " paginated" : ""
        }`}
      >
        {data.map((item: any) => (
          <div className="col" key={item.isbn13}>
            <BookItem
              title={item.title}
              subtitle={item.subtitle}
              isbn={item.isbn13}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksHome;
