import { ReactElement, useState } from "react";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

function Skeleton({ children }: { children: ReactElement }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Container fluid className="p-0">
      <header>
        <Navbar expand="md" dark color="primary" sticky="top" container="xl">
          <NavbarBrand href="/">Kingdom Library</NavbarBrand>
          <NavbarToggler onClick={toggleIsOpen} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="mt-3 mt-md-0 ms-auto">
              <NavItem>
                <NavLink href="/books" className="text-warning">
                  Latest
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
      <>{children}</>
    </Container>
  );
}

export default Skeleton;
