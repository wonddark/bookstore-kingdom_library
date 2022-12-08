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
import { useAppSelector } from "../../state/hooks";
import { selectAuthenticated, selectUserId } from "../../state/session.slice";

function Skeleton({ children }: { children: ReactElement }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  const state = useAppSelector((state) => state);
  const authenticated = selectAuthenticated(state);
  const userId = selectUserId(state);
  return (
    <Container fluid className="p-0">
      <header className="sticky-top">
        <Navbar expand="md" dark color="navbar-dark" container="xl">
          <NavbarBrand href="/">Kingdom Library</NavbarBrand>
          <NavbarToggler onClick={toggleIsOpen} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="mt-3 mt-md-0 ms-auto">
              <NavItem>
                <NavLink href="/books" className="link-success">
                  Latest
                </NavLink>
              </NavItem>
              {authenticated ? (
                <NavItem>
                  <NavLink
                    href={`/users/${userId}/cart`}
                    className="link-success"
                  >
                    Cart
                  </NavLink>
                </NavItem>
              ) : null}
              {authenticated ? (
                <NavItem>
                  <NavLink href="/logout" className="link-success">
                    Close session
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink href="/authenticate" className="link-success">
                    Authenticate
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
      <>{children}</>
    </Container>
  );
}

export default Skeleton;
