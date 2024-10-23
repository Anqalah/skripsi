import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { store } from "./App/store";
import "./index.css";
import AddTeacher from "./Pages/AddTeacher.jsx";
import AbsenAdmin from "./Pages/Admin/AbsenAdmin";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import StudentAdmin from "./Pages/Admin/StudentAdmin";
import TeacherAdmin from "./Pages/Admin/TeacherAdmin";
import LoginPage from "./Pages/login";
import ProductsPages from "./Pages/products";
import RegisterPage from "./Pages/register";
import AbsenStudent from "./Pages/Student/AbsenStudent";
import HomeStudent from "./Pages/Student/HomeStudent";
import ProfileStudent from "./Pages/Student/ProfileStudent";
import AbsenTeacher from "./Pages/Teacher/AbsenTeacher";
import ClassTeacher from "./Pages/Teacher/ClassTeacher";
import HomeTeacher from "./Pages/Teacher/HomeTeacher";
import ProfileTeacher from "./Pages/Teacher/ProfileTeacher";
import EditTeacher from "./Pages/EditTeacher.jsx";

axios.defaults.withCredentials = true;

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
    path: "/addUser",
    element: <RegisterPage />,
  },
  {
    path: "/teacher/add",
    element: <AddTeacher />,
  },
  {
    path: "/teacher/edit/:id",
    element: <EditTeacher />,
  },
  {
    path: "/products",
    element: <ProductsPages />,
  },
  {
    path: "/dashboard/student",
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
    path: "/dashboard/teacher",
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
    path: "/dashboard/admin",
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
