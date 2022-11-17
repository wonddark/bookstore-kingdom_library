import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Authenticate from "./components/pages/Authenticate";
import Register from "./components/pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="authenticate" element={<Authenticate />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

export default router;
