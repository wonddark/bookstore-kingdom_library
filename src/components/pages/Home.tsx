import {
  Col,
  Collapse,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import { ReactComponent as BooksLover } from "../../assets/undraw_book_lover_re_rwjy.svg";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Container fluid className="p-0">
      <header>
        <Navbar expand="md" dark color="primary" sticky="top" container="xl">
          <NavbarBrand>Kingdom Library</NavbarBrand>
          <NavbarToggler onClick={toggleIsOpen} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="mt-3 mt-md-0 ms-auto">
              <NavItem>
                <NavLink href="/" className="text-warning">
                  New
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/authenticate">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
      <Container
        fluid
        className="p-0 bg-primary bg-gradient home-hero-container"
      >
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
                We have gathered thousands of titles to feed your knowledge.
                Feel free to look around, you will find for sure something that
                grabs your attention but also, if you know what are yo looking
                you can use our modest search
              </p>
              <p className="lead d-block d-lg-none text-center text-lg-start">
                Thousands of titles gathered to feed your knowledge. Look around
                and find something interesting for you.
              </p>
              <Form className="mt-5">
                <InputGroup>
                  <Input
                    type="search"
                    placeholder="Try to find something interesting"
                    bsSize="lg"
                  />
                  <InputGroupText className="bg-success border-success search-form-btn">
                    <i className="bi bi-search text-light" />
                  </InputGroupText>
                </InputGroup>
              </Form>
            </Col>
            <Col className="order-0 order-lg-1 text-center">
              <BooksLover className="home-hero-image" />
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
}

export default Home;
