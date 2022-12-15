import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home";
import BooksHome from "./components/pages/BooksHome";
import BookDetails from "./components/pages/BookDetails";
import Skeleton from "./components/layout/Skeleton";
import UserCart from "./components/pages/UserCart";
import Authentication from "./components/pages/Authentication";
import LogoutControl from "./components/pages/LogoutControl";
import Checkout from "./components/pages/Checkout";
import CheckAccess from "./components/widgets/CheckAccess";

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
