import { useGetBooksQuery, useSearchBooksQuery } from "../../state/api";
import BookItem from "./BookItem";
import { Col, Container, Row } from "reactstrap";
import SearchForm from "./SearchForm";
import { useAppSelector } from "../../state/hooks";
import {
  selectPage,
  selectPaginate,
  selectQuery,
  selectSearching,
} from "../../state/books.slice";
import { useEffect, useState } from "react";
import "./BooksHome.css";
import Pagination from "./Pagination";

function BooksHome() {
  const [data, setData] = useState([]);
  const state = useAppSelector((state) => state);
  const searching = selectSearching(state);
  const page = selectPage(state);
  console.log(page);
  const query = selectQuery(state);
  const paginate = selectPaginate(state);
  const { data: newBooks, isLoading: loadingNewBooks } = useGetBooksQuery(
    {},
    { skip: searching }
  );
  const { data: searchResults, isLoading: loadingSearchResults } =
    useSearchBooksQuery({ query, page }, { skip: !searching });
  useEffect(() => {
    if (searching) {
      if (!loadingSearchResults) {
        searchResults && setData(searchResults.books);
      }
    } else if (!loadingNewBooks) {
      newBooks && setData(newBooks.books);
    }
  }, [
    searching,
    loadingNewBooks,
    loadingSearchResults,
    newBooks,
    searchResults,
  ]);
  return (
    <Container className="py-2">
      <Row className="mt-4">
        <Col xs={12} md={9} xl={7} className="mx-auto">
          <SearchForm />
        </Col>
      </Row>
      {paginate && <Pagination />}
      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
        xxl={5}
        className={`g-4 mt-2 mb-4 books-list${paginate ? " paginated" : ""}`}
      >
        {data.map((item: any) => (
          <Col key={item.isbn13}>
            <BookItem
              title={item.title}
              subtitle={item.subtitle}
              isbn={item.isbn13}
              price={item.price}
              image={item.image}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BooksHome;
