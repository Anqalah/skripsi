import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";
import store from "../src/App/store";
// import axios from "axios";
import { Provider } from "react-redux";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
// import ErrorPage from "./Pages/error";
import ProductsPages from "./Pages/products";
import HomeStudent from "./Pages/Student/HomeStudent";
import AbsenStudent from "./Pages/Student/AbsenStudent";
import ProfileStudent from "./Pages/Student/ProfileStudent";
import HomeTeacher from "./Pages/Teacher/HomeTeacher";
import ClassTeacher from "./Pages/Teacher/ClassTeacher";
import AbsenTeacher from "./Pages/Teacher/AbsenTeacher";
import ProfileTeacher from "./Pages/Teacher/ProfileTeacher";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import TeacherAdmin from "./Pages/Admin/TeacherAdmin";
import StudentAdmin from "./Pages/Admin/StudentAdmin";
import AbsenAdmin from "./Pages/Admin/AbsenAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <p className="flex font-bold text-[#8d99ae] bg-[#2b2d42] justify-center text-[86px] min-h-screen items-center">
        <Link to="/login">SKRIPSI LEE</Link>
      </p>
    ),
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
    path: "/products",
    element: <ProductsPages />,
  },
  {
    path: "/student",
    element: <HomeStudent />,
  },
  {
    path: "/student/absen",
    element: <AbsenStudent />,
  },
  {
    path: "/student/profile",
    element: <ProfileStudent />,
  },
  {
    path: "/teacher",
    element: <HomeTeacher />,
  },
  {
    path: "/teacher/class",
    element: <ClassTeacher />,
  },
  {
    path: "/teacher/absen",
    element: <AbsenTeacher />,
  },
  {
    path: "/teacher/profile",
    element: <ProfileTeacher />,
  },
  {
    path: "/admin",
    element: <DashboardAdmin />,
  },
  {
    path: "/admin/teacher",
    element: <TeacherAdmin />,
  },
  {
    path: "/admin/student",
    element: <StudentAdmin />,
  },
  {
    path: "/admin/absen",
    element: <AbsenAdmin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
