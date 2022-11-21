import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home";
import BooksHome from "./components/widgets/BooksHome";
import BookDetails from "./components/widgets/BookDetails";
import Skeleton from "./components/layout/Skeleton";

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
    </Route>
  )
);

export default router;
