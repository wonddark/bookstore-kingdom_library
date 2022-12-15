import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./components/pages/Home";
import BooksHome from "./components/pages/BooksHome";
import BookDetails from "./components/pages/BookDetails";
import Skeleton from "./components/layout/Skeleton";
import UserCart from "./components/pages/UserCart";
import Authentication from "./components/pages/Authentication";
import LogoutControl from "./components/pages/LogoutControl";
import Checkout from "./components/pages/Checkout";
import { ReactElement } from "react";
import { useAppSelector } from "./state/hooks";
import { SESSION_STORE_KEY } from "./state/session.slice";

function CheckAccess({ children }: { children: ReactElement }) {
  const { userId } = useParams();
  const storedId = useAppSelector((state) => state[SESSION_STORE_KEY].userId);
  return (
    <>
      {storedId === userId ? (
        children
      ) : (
        <div className="container my-3 py-2 text-center">
          <p className="display-5 text-danger">
            You are not allowed to be here
          </p>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <p className="lead mt-3">
                You seems to be accidentally out of place. Please{" "}
                <Link to="/">go back home</Link> and keep diving into our great
                collection of technical books. If this error occurs to you once
                again be kind and report it to us, we'll do our best to solve it
                as soon as possible
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <Skeleton>
            <Home />
          </Skeleton>
        }
      />
      <Route
        path="books"
        element={
          <Skeleton>
            <BooksHome />
          </Skeleton>
        }
      />
      <Route
        path="books/:isbn"
        element={
          <Skeleton>
            <BookDetails />
          </Skeleton>
        }
      />
      <Route
        path="authenticate"
        element={
          <Skeleton>
            <Authentication />
          </Skeleton>
        }
      />
      <Route
        path="logout"
        element={
          <Skeleton>
            <LogoutControl />
          </Skeleton>
        }
      />
      <Route
        path="users/:userId/cart"
        element={
          <Skeleton>
            <CheckAccess>
              <UserCart />
            </CheckAccess>
          </Skeleton>
        }
      />
      <Route
        path="checkout/:userId"
        element={
          <Skeleton>
            <CheckAccess>
              <Checkout />
            </CheckAccess>
          </Skeleton>
        }
      />
    </Route>
  )
);

export default router;
