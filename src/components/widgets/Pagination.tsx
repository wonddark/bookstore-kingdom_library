import {
  Col,
  Pagination as BsPagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import { useSearchParams } from "react-router-dom";

type Props = { enableBack: boolean; enableForward: boolean };
function Pagination({ enableBack, enableForward }: Props) {
  const [readSearchParams, writeSearchParams] = useSearchParams();
  const query = readSearchParams.get("query") || "";
  const page = Number(readSearchParams.get("page")) || 1;
  const previousPage = () => {
    writeSearchParams(() => {
      if (page > 1) {
        return { query, page: `${page - 1}` };
      }
      return { query, page: "1" };
    });
  };
  const nextPage = () => {
    writeSearchParams({ query, page: `${page + 1}` });
  };
  return (
    <Row className="mt-2">
      <Col>
        <BsPagination listClassName="right-pagination">
          <PaginationItem disabled={!enableBack}>
            <PaginationLink previous onClick={previousPage}>
              <i className="bi bi-chevron-double-left me-2" />
              Previous
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={!enableForward}>
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
