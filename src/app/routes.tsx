import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { LocationDetail } from "./pages/LocationDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/location/:id",
    Component: LocationDetail,
  },
]);
