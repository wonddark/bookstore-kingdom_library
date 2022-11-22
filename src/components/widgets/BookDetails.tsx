import { Col, Container, Placeholder, Row } from "reactstrap";
import { useLazyGetBookDetailsQuery } from "../../state/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const he = require("he");

function BookDetails() {
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
  useEffect(loadData, [isbn]);
  return (
    <Container className="py-4">
      <button
        className="card card-body px-3 py-2 flex-row"
        onClick={backToList}
      >
        <i className="bi bi-chevron-left me-2" /> Back to list
      </button>
      {!isLoading && data ? (
        <Row>
          <Col xs={12} md={3} className="text-center mb-4">
            <img src={data.image} alt="book-portrait" className="img-fluid" />
            <span className="d-block w-100 fs-5">ISBN: {data.isbn13}</span>
          </Col>
          <Col>
            <h1>{he.decode(data.title)}</h1>
            <span className="fs-5 fw-bolder">{data.price}</span>
            <h3>{he.decode(data.subtitle)}</h3>
            <h2 className="h4 my-3">{data.authors}</h2>
            <p className="lead">{he.decode(data.desc)}</p>
            <span className="fs-5 fw-bolder">Rating: {data.rating} / 5</span>
            <div className="mt-3 fs-5">
              <strong>Year:</strong> {data.year}
            </div>
            <div className="fs-5">
              <strong>Publisher:</strong> {data.publisher}
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Placeholder />
          </Col>
          <Col>
            <Placeholder />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BookDetails;
