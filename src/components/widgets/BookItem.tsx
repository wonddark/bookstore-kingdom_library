import { useNavigate } from "react-router-dom";

function BookItem({
  title,
  subtitle,
  isbn,
  price,
  image,
}: {
  title: string;
  subtitle: string;
  isbn: string;
  price: string;
  image: string;
}) {
  const navigate = useNavigate();
  const viewBookDetails = () => {
    navigate(`/books/${isbn}`);
  };
  return (
    <button className="card card-body shadow h-100" onClick={viewBookDetails}>
      <img src={image} alt="book-portrait" className="img-fluid" />
      <span className="h5 text-start">{title}</span>
      <span className="text-body text-start">{subtitle}</span>
      <div className="d-flex justify-content-between mt-3 w-100">
        <small className="text-muted">{isbn}</small>
        <strong className="fw-bolder-">{price}</strong>
      </div>
    </button>
  );
}

export default BookItem;
