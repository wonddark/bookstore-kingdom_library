import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  subtitle: string;
  isbn: string;
  price: string;
  image: string;
};
function BookItem({ title, subtitle, isbn, price, image }: Props) {
  const navigate = useNavigate();
  const viewBookDetails = () => {
    navigate(`/books/${isbn}`);
  };
  return (
    <button
      className="card card-body justify-content-between shadow h-100"
      onClick={viewBookDetails}
    >
      <div>
        <img src={image} alt="book-portrait" className="img-fluid" />
        <span className="h5 fs-6 text-start d-block">{title}</span>
        <span className="d-block fw-light text-start">{subtitle}</span>
      </div>
      <div className="d-flex justify-content-between mt-3 w-100 small">
        <em className="text-muted">{isbn}</em>
        <strong className="fw-bolder text-primary">{price}</strong>
      </div>
    </button>
  );
}

export default BookItem;
