import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { children, title, type } = props;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        {/* Logo/Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 p-3 rounded-2xl mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="mt-3 text-gray-500 font-light">
            {type === "login"
              ? "Masuk untuk melanjutkan ke akun Anda"
              : "Daftarkan diri Anda untuk memulai"}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">{children}</div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {type === "login" ? (
            <span>
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Daftar disini
              </Link>
            </span>
          ) : (
            <span>
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Masuk disini
              </Link>
            </span>
          )}
        </div>

        {/* Decorative Accent */}
        <div className="mt-8 border-t pt-6 text-center">
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} Aplikasi Anda. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
