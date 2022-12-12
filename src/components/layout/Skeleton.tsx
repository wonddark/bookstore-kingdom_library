import { ReactElement } from "react";
import { useAppSelector } from "../../state/hooks";
import { selectAuthenticated, selectUserId } from "../../state/session.slice";
import { Link } from "react-router-dom";

function Skeleton({ children }: { children: ReactElement }) {
  const state = useAppSelector((state) => state);
  const authenticated = selectAuthenticated(state);
  const userId = selectUserId(state);
  return (
    <div className="container-fluid p-0">
      <header className="sticky-top">
        <div className="navbar navbar-expand-md navbar-dark bg-navbar-dark">
          <div className="container-xl">
            <Link className="navbar-brand" to="/">
              Kingdom Library
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mt-3 mt-md-0 ms-auto">
                <li className="nav-item">
                  <a href="/books" className="nav-link link-success">
                    Latest
                  </a>
                </li>
                {authenticated ? (
                  <li className="nav-item">
                    <a
                      href={`/users/${userId}/cart`}
                      className="nav-link link-success"
                    >
                      Cart
                    </a>
                  </li>
                ) : null}
                {authenticated ? (
                  <li className="nav-item">
                    <a href="/logout" className="nav-link link-success">
                      Close session
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a href="/authenticate" className="nav-link link-success">
                      Authenticate
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <>{children}</>
    </div>
  );
}

export default Skeleton;
