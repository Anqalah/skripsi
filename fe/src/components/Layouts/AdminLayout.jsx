import React, { useState } from "react";
import Button from "../Elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "../../Features/authSlice";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="px-4 py-2 lg:px-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-semibold">SKRIPSI ABSEN</span>
          </div>
          <div className="relative"></div>
        </div>
        <ul className="space-y-5 font-medium">
          <li>
            <a
              href="/admin/dashboard/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/teacher"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="ms-3">Data Guru</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/student"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="ms-3">Data Siswa</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/absen"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span className="ms-3">Data Absen</span>
            </a>
          </li>
        </ul>
        <div className="flex items-center h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={"/public/images/shoes1.jpg"}
              // user.photo ||
              alt="user photo"
              onClick={toggleProfilePopup}
            />
            {isProfileOpen && (
              <div className="relative right-0 w-64 mt-2 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="p-4 flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-3"
                    src={"/public/images/shoes1.jpg"}
                    // user.photo ||
                    alt="user profile"
                  />
                  <div>
                    <div className="font-bold text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <div className="border-t  border-gray-200">
                  <Button
                    classname="w-full text-blue-300  text-left p-2 hover:bg-blue-500 transition-colors duration-200"
                    onClick={() => {
                      navigate(`/admin/edit/${user.uuid}`);
                    }}
                  >
                    Ubah Profil
                  </Button>
                  <Button
                    classname="w-full text-left p-2 hover:bg-red-700 transition-colors duration-200"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
