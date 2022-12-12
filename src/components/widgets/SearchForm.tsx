import { Button, Form, Input, InputGroup } from "reactstrap";
import { useLazySearchBooksQuery } from "../../state/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchForm() {
  const [readSearchParams, writeSearchParams] = useSearchParams();
  const [query, setQuery] = useState(readSearchParams.get("query") || "");
  const [page] = useState(Number(readSearchParams.get("page")) || 1);
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
    searchBooks({ query, page });
    if (pathname === "/") {
      navigate({ pathname: "/books", search: `query=${query}&page=${page}` });
    } else {
      writeSearchParams({ query, page: `${page}` });
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
          disabled={isLoading}
        >
          <i className="bi bi-search text-light" />
        </Button>
      </InputGroup>
    </Form>
  );
}
export default SearchForm;
