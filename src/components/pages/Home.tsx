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

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Container fluid className="p-0">
      <header className="bg-primary bg-gradient">
        <Navbar expand="md" dark color="primary" sticky="top" container="xl">
          <NavbarBrand>Kingdom Library</NavbarBrand>
          <NavbarToggler onClick={toggleIsOpen} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="mt-3 mt-md-0 ms-auto">
              <Form className="me-md-2 mb-2 mb-md-0">
                <InputGroup>
                  <Input type="search" placeholder="Try to find it" />
                  <InputGroupText className="bg-success border-success">
                    <i className="bi bi-search text-light" />
                  </InputGroupText>
                </InputGroup>
              </Form>
              <NavItem>
                <NavLink href="/authenticate">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container fluid="xl" className="my-5 py-5">
          <Row>
            <Col xl={8} className="mt-5 pt-5">
              <h4 className="display-6 mb-3">Welcome to our Kingdom Library</h4>
              <p className="lead">
                We have gathered thousands of titles to feed your knowledge.
                Feel free to look around, you will find for sure something that
                grabs your attention but also, if you know what are yo looking
                you can use our modest search
              </p>
            </Col>
            <Col>
              <BooksLover style={{ fontSize: "320px" }} />
            </Col>
          </Row>
        </Container>
      </header>
      <Container fluid="xl">
        <h3>Here will go our newest acquisitions</h3>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </Container>
      <footer className="bg-dark text-light py-3">
        <Container fluid="xl">
          <Row>
            <Col xl={5}>
              <p className="lead fs-6">Kingdom Library</p>
              <p className="lead fs-6">
                Biplanta #7b, Micro 7, Distrito José Martí, Santiago de Cuba,
                Cuba
              </p>
              <p className="lead fs-6">
                Zip code: <strong>10605</strong>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
}

export default Home;
