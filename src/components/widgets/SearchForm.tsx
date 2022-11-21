import { Button, Form, Input, InputGroup } from "reactstrap";
import "./SearchForm.css";
import { useLazySearchBooksQuery } from "../../state/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  selectQuery,
  setQuery as setQueryState,
} from "../../state/books.slice";
import { useLocation, useNavigate } from "react-router-dom";

function SearchForm() {
  const state = useAppSelector((state) => state);
  const queryState = selectQuery(state);
  const [query, setQuery] = useState(queryState);
  const [page] = useState(1);
  const dispatch = useAppDispatch();
  const [searchBooks, { isLoading }] = useLazySearchBooksQuery();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const updateQuery = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuery(value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQueryState(query));
    searchBooks({ query, page });
    if (pathname === "/") {
      navigate("/books");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="search"
          placeholder="Try to find something interesting"
          bsSize="lg"
          value={query}
          onChange={updateQuery}
        />
        <Button
          type="submit"
          color="success"
          className="input-group-text search-form-btn"
        >
          <i className="bi bi-search text-light" />
        </Button>
      </InputGroup>
    </Form>
  );
}
export default SearchForm;
