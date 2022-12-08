import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home";
import BooksHome from "./components/widgets/BooksHome";
import BookDetails from "./components/widgets/BookDetails";
import Skeleton from "./components/layout/Skeleton";
import UserCart from "./components/widgets/UserCart";
import Authentication from "./components/widgets/Authentication";
import LogoutControl from "./components/widgets/LogoutControl";

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
            <UserCart />
          </Skeleton>
        }
      />
    </Route>
  )
);

export default router;
