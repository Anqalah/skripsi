// StudentLayout.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../Features/authSlice";
import { HomeIcon, ClockIcon, CameraIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const StudentLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const { isError, user: authUser } = useSelector((state) => state.auth);
  const [hasClockedIn, setHasClockedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const action = await dispatch(getMe());
        if (getMe.rejected.match(action)) navigate("/");
        else checkAttendance(action.payload.uuid);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    authUser && fetchUser();
  }, [dispatch, navigate, authUser]);

  const checkAttendance = async (userId) => {
    try {
      const date = new Date().toISOString().split("T")[0];
      const response = await axios.get(
        `/api/attendances/check/${userId}?date=${date}`
      );
      setHasClockedIn(response.data.hasClockedIn);
    } catch (error) {
      console.error("Attendance check error:", error);
    }
  };

  if (!authUser) return null;

  return (
    <div className="relative w-full max-w-md h-screen mx-auto bg-gray-50 overflow-hidden font-inter">
      {/* Modern Gradient Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-primary to-blue-600 shadow-sm">
        <div className="flex justify-between items-center p-5">
          <h1 className="text-white font-bold text-xl">Student Portal</h1>

          <div className="relative">
            <img
              src="/images/shoes1.jpg"
              alt="profile"
              className="w-12 h-12 rounded-full cursor-pointer border-2 border-white/30 shadow-lg hover:scale-105 transition-transform"
              onClick={() => setShowUserModal(!showUserModal)}
            />

            {/* Enhanced User Modal */}
            {showUserModal && (
              <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 animate-slideDown">
                <div className="p-3 space-y-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{authUser.name}</p>
                    <p className="text-sm text-gray-500">{authUser.kelas}</p>
                  </div>
                  <button
                    onClick={() => navigate("/student/profile")}
                    className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-red-500 hover:bg-gray-50 rounded-lg transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-5 pb-24 h-full overflow-y-auto scroll-smooth">
        {children}
      </main>

      {/* Floating Navigation Bar */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-around items-center p-2">
          <NavLink
            to="/student/dashboard"
            icon={<HomeIcon />}
            label="Home"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />

          {/* Scan Button with Gradient */}
          <Link
            to={
              hasClockedIn
                ? `/attendances/clockout/${authUser.uuid}`
                : `/attendances/clockin/${authUser.uuid}`
            }
            className="relative -top-8"
          >
            <button className="p-5 rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <CameraIcon className="w-8 h-8 text-white" />
            </button>
          </Link>

          <NavLink
            to="/student/absen"
            icon={<ClockIcon />}
            label="History"
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
        </div>
      </nav>
    </div>
  );
};

const NavLink = ({ to, icon, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
      active ? "bg-blue-50 text-primary" : "text-gray-500 hover:bg-gray-50"
    }`}
  >
    {React.cloneElement(icon, {
      className: `w-7 h-7 ${active ? "stroke-2" : ""}`,
    })}
    <span className="text-xs mt-1 font-medium">{label}</span>
  </Link>
);

export default StudentLayout;
