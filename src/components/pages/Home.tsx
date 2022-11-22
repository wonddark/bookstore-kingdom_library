import { Col, Container, Row } from "reactstrap";
import { ReactComponent as BooksLover } from "../../assets/undraw_book_lover_re_rwjy.svg";
import SearchForm from "../widgets/SearchForm";

function Home() {
  return (
    <Container fluid className="home-hero-container">
      <Container fluid="xl" className="py-3 py-md-5">
        <Row>
          <Col
            lg={8}
            xl={7}
            className="mt-4 mt-lg-2 pt-lg-5 order-1 order-lg-0"
          >
            <h4 className="display-6 mb-3 text-center text-lg-start">
              Welcome to our Kingdom Library
            </h4>
            <p className="lead d-none d-lg-block">
              We have gathered thousands of titles to feed your knowledge. Feel
              free to look around, you will find for sure something that grabs
              your attention but also, if you know what are yo looking you can
              use our modest search
            </p>
            <p className="lead d-block d-lg-none text-center text-lg-start">
              Thousands of titles gathered to feed your knowledge. Look around
              and find something interesting for you.
            </p>
            <div className="mt-5">
              <SearchForm />
            </div>
          </Col>
          <Col className="order-0 order-lg-1 text-center">
            <BooksLover className="home-hero-image" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
