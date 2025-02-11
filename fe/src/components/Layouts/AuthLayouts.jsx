import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, type }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Bagian Branding Institusi */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-primary to-blue-600 p-10 items-center justify-center">
          <div className="text-white text-center space-y-8">
            <div className="inline-block bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <img
                src="../../../public/images/shoes1.jpg"
                alt="Logo Institusi"
                className="w-40 h-40 object-contain rounded-full"
              />
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              LPK MALEO GOGAKUIN
            </h2>
            <p className="text-2xl font-light opacity-90">PALU</p>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="md:w-3/5 p-10 flex flex-col justify-between">
          <div>
            <div className="space-y-2 mb-10">
              <h1 className="text-4xl font-bold text-gray-900 text-center md:text-left">
                {title}
              </h1>
              <p className="text-lg text-gray-600 font-light text-center md:text-left">
                {type === "login"
                  ? "Silakan masuk untuk melanjutkan ke sistem presensi"
                  : "Daftarkan diri Anda untuk akses sistem presensi"}
              </p>
            </div>

            <div className="max-w-md mx-auto md:mx-0">{children}</div>
          </div>

          {/* Footer Links yang Diperbaiki */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
            {type === "login" ? (
              <div className="flex flex-col gap-3 text-center items-center md:text-left">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-blue-700 transition-colors"
                >
                  Lupa Password?
                </Link>
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className=" font-semibold text-primary hover:text-blue-700 transition-colors"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            ) : (
              <p className="text-sm  text-gray-600 text-center md:text-left">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:text-blue-700 transition-colors"
                >
                  Masuk disini
                </Link>
              </p>
            )}

            <div className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} LPK MALEO GOGAKUIN. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
