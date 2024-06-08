import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import ErrorPage from "./Pages/error";
import ForgotPassword from "./Pages/forgot";
import { Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <p className="flex font-bold text-[#8d99ae] bg-[#2b2d42] justify-center text-[86px] min-h-screen items-center">
        <Link to="/login">SKRIPSI LEE</Link>
      </p>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
