import useBookDetails from "../../hooks/book-details.hook";
import AddToCartBtn from "../widgets/AddToCartBtn";
import { useAppSelector } from "../../state/hooks";
import { selectAuthenticated } from "../../state/session.slice";

const he = require("he");

function BookDetails() {
  const { backToList, isLoading, data } = useBookDetails();
  const state = useAppSelector((state) => state);
  const isAuthenticated = selectAuthenticated(state);
  return (
    <div className="container py-4">
      <button
        className="card card-body px-3 py-2 flex-row"
        onClick={backToList}
      >
        <i className="bi bi-chevron-left me-2" /> Back to list
      </button>
      {!isLoading && data ? (
        <div className="card card-body mt-3">
          <div className="row">
            <div className="col-12 col-md-3 text-center mb-4">
              <img src={data.image} alt="book-portrait" className="img-fluid" />
              <span className="d-block w-100 fs-6">ISBN: {data.isbn13}</span>
              <span className="d-block w-100 fs-6">{data.publisher}</span>
            </div>
            <div className="col">
              <h1 className="mb-0 display-1 fs-2">{he.decode(data.title)}</h1>
              <div className="mb-2">
                <small className="fw-bolder bg-primary text-light py-1 px-3 mb-2">
                  {data.price}
                </small>
                <small className="ms-3 fw-bold text-primary">
                  <i className="bi bi-star-half me-1" />
                  {data.rating}/5
                </small>
                <small className="ms-3 text-muted">
                  <i className="bi bi-calendar-event me-1" />
                  {data.year}
                </small>
              </div>
              <h4 className="display-1 fs-5 fst-italic">
                {he.decode(data.subtitle)}
              </h4>
              <h2 className="fs-5 mb-4">{data.authors}</h2>
              <p className="lead">{he.decode(data.desc)}</p>
              {isAuthenticated && Number(data.price.replace("$", "")) > 0 ? (
                <div className="mt-2">
                  <AddToCartBtn book={data} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="card card-body">
          <div className="container">
            <div className="row justify-content-between placeholder-glow">
              <div
                className="col-12 col-md-3 placeholder"
                style={{ minHeight: "200px" }}
              />
              <div
                className="col-12 col-md-8 placeholder"
                style={{ minHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
