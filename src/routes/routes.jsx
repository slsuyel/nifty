import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home/Home";
import Main from "../LayOut/Main";
import Login from "../pages/Shared/Login/Login";
import Register from "../pages/Shared/Register/Register";
import Plan from "../pages/Plan/Plan";
import Profile from "../pages/Profile/Profile";
import Payment from "../pages/payment/StripePayment/Payment";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/payment",
        element: <Plan />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/payment/10",
        element: <PrivateRoute><Payment /></PrivateRoute>,
      },
    ],
  },
]);