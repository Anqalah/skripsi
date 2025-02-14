// FormLogin.jsx
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Features/authSlice";
import AuthLayout from "../Layouts/AuthLayouts";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess) {
      switch (user.role) {
        case "Admin":
          navigate("/admin/dashboard/");
          break;
        case "Teacher":
          navigate("/teacher/dashboard");
          break;
        case "Student":
          navigate("/student/dashboard");
          break;
        default:
          break;
      }
    }

    if (isError) {
      setError(message);
    }
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null); // Reset error state sebelum mencoba login
    try {
      dispatch(login({ email, password }));
    } catch (error) {
      setError("Terjadi kesalahan saat mencoba login.");
      console.log(error);
    }
  };

  return (
    <AuthLayout title="Masuk ke Akun" type="login">
      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="contoh@email.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-600 text-white py-3.5 px-6 rounded-lg font-semibold 
                     transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          Masuk Sekarang
        </button>
      </form>
    </AuthLayout>
  );
};

export default FormLogin;
