import BookItem from "../widgets/BookItem";
import SearchForm from "../widgets/SearchForm";
import Pagination from "../widgets/Pagination";
import useBookData from "../../hooks/books-data.hook";

function BooksHome() {
  const { data, shouldPaginate } = useBookData();
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
