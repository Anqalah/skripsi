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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow">
        <div className="px-4 py-3 lg:px-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-semibold">SKRIPSI ABSEN</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? "Sembunyikan Menu" : "Tampilkan Menu"}
            </button>
            <img
              className="w-8 h-8 rounded-full cursor-pointer ml-3"
              src={"/images/logo.jpg"}
              // user.photo ||
              alt="user photo"
              onClick={toggleProfilePopup}
            />
            {isProfileOpen && (
              <div className="absolute right-0 w-64 mt-2 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="p-4 flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-3"
                    src={"/images/logo.jpg"}
                    // user.photo ||
                    alt="user profile"
                  />
                  <div>
                    <div className="font-bold text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <Button
                    classname="w-full text-left p-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      navigate("/profile/edit");
                    }}
                  >
                    Ubah Profil
                  </Button>
                  <Button
                    classname="w-full text-left p-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-5 font-medium">
            <li>
              <a
                href="/dashboard/admin/"
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
          <Button
            classname="flex w-full justify-center items-center p-2 mt-5 bg-[#03A9F4] text-white rounded-lg dark:text-black hover:bg-red-500 dark:hover:bg-gray-700 group"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </aside>

      <div className={`p-4 sm:${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
