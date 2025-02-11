// LoginPage.jsx
import { Link } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayouts";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout title="Masuk ke Akun" type="login">
      {/* Login Form */}
      <form className="space-y-6">
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="contoh@email.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all pr-12"
                placeholder="••••••••"
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

export default LoginPage;
