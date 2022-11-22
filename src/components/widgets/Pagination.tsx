import {
  Col,
  Pagination as BsPagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import { selectPage, setPage } from "../../state/books.slice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

function Pagination() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const page = selectPage(state);
  const previousPage = () => {
    dispatch(setPage(page > 1 ? page - 1 : 1));
  };
  const nextPage = () => {
    dispatch(setPage(page + 1));
  };
  return (
    <Row className="mt-2">
      <Col>
        <BsPagination listClassName="right-pagination">
          <PaginationItem disabled={page === 1}>
            <PaginationLink previous onClick={previousPage}>
              <i className="bi bi-chevron-double-left me-2" />
              Previous
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={nextPage}>
              Next
              <i className="bi bi-chevron-double-right ms-2" />
            </PaginationLink>
          </PaginationItem>
        </BsPagination>
      </Col>
    </Row>
  );
}

export default Pagination;
