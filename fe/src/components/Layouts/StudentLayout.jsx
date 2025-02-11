import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../Features/authSlice";
import { HomeIcon, ClockIcon, CameraIcon } from "@heroicons/react/24/outline";

const StudentLayout = ({ children }) => {
  const dispatch = useDispatch(); // Tambahkan ini
  const [showUserModal, setShowUserModal] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const { isError, user: authUser } = useSelector((state) => state.auth);
  const [hasClockedIn, setHasClockedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const action = await dispatch(getMe()); // Sekarang dispatch sudah terdefinisi
      if (getMe.rejected.match(action)) {
        navigate("/");
      } else {
        checkAttendance(action.payload.uuid);
      }
    };

    if (authUser) {
      fetchUser();
    }
  }, [dispatch, navigate, authUser]); // Tambahkan authUser ke dependencies

  const checkAttendance = async (userId) => {
    const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    try {
      const response = await axios.get(
        `/api/attendances/check/${userId}?date=${date}`
      );
      if (response.data.hasClockedIn) {
        setHasClockedIn(true);
      } else {
        setHasClockedIn(false);
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      // Handle error, e.g., set an error state if needed
    }
  };

  if (!authUser) return null;

  return (
    <div className="relative w-full max-w-md h-screen mx-auto bg-neutral-50 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-primary shadow-md">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            {/* Tombol header dihapus */}
          </div>

          <div className="relative">
            <img
              src="/images/shoes1.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-md"
              onClick={() => setShowUserModal(!showUserModal)}
            />

            {/* User Modal */}
            {showUserModal && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-neutral-200">
                <div className="p-4 space-y-3">
                  <button
                    onClick={() => {
                      navigate("/student/profile");
                      setShowUserModal(false);
                    }}
                    className="w-full text-left text-neutral-700 hover:bg-neutral-100 p-2 rounded"
                  >
                    Edit Profile
                  </button>
                  <button className="w-full text-left text-red-500 hover:bg-neutral-100 p-2 rounded">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 min-h-[calc(100vh-160px)]">{children}</main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 py-2 shadow-lg">
        <div className="flex justify-around items-center px-2">
          {/* Home */}
          <Link
            to="/student/dashboard"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              activeTab === "home" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Scan Button */}
          <Link
            to={
              hasClockedIn
                ? `/attendances/clockout/${authUser.uuid}`
                : `/attendances/clockin/${authUser.uuid}`
            }
          >
            <button
              onClick={() => setIsClockedIn(!isClockedIn)}
              className={`p-4 rounded-full -mt-8 shadow-lg ${
                isClockedIn
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-colors`}
            >
              <CameraIcon className="w-8 h-8 text-white" />
            </button>
          </Link>

          {/* History */}
          <Link
            to="/student/absen"
            className={`flex flex-col items-center px-4 py-2 rounded-lg 
              ${activeTab === "history" ? "text-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("history")}
          >
            <ClockIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">History</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default StudentLayout;
