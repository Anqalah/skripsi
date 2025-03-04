import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";
import Button from "../Elements/Button";
import AuthLayout from "../Layouts/AuthLayouts";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...formData } = data;
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      navigate(`/register/face?token=${response.data.verification_token}`);
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
    }
  };

  const Bidang = ["Pertanian", "Konstruksi", "Perikanan", "Pengolahan Makanan"];
  const Kelas = ["A", "B", "C"];

  return (
    <AuthLayout type={"register"} title={"Daftar Akun Baru"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-[#4A5568] mb-2 font-medium">
              Nama Lengkap
            </label>
            <input
              {...register("name", { required: "Nama wajib diisi" })}
              className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
            />
            {errors.name && (
              <span className="text-[#C53030] text-sm mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#4A5568] mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format email tidak valid",
                },
              })}
              className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
            />
            {errors.email && (
              <span className="text-[#C53030] text-sm mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Bidang */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A5568] mb-2 font-medium">
                Bidang
              </label>
              <select
                {...register("bidang", { required: "Pilih Bidang" })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
              >
                {Bidang.map((bidang) => (
                  <option key={bidang} value={bidang}>
                    {bidang}
                  </option>
                ))}
              </select>
              {errors.bidang && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.bidang.message}
                </span>
              )}
            </div>

            {/* Kelas*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A5568] mb-2 font-medium">
                  Kelas
                </label>
                <select
                  {...register("kelas", { required: "Pilih kelas" })}
                  className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
                >
                  {Kelas.map((kelas) => (
                    <option key={kelas} value={kelas}>
                      {kelas}
                    </option>
                  ))}
                </select>
                {errors.kelas && (
                  <span className="text-[#C53030] text-sm mt-1 block">
                    {errors.kelas.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[#4A5568] mb-2 font-medium">
                  Jenis Kelamin
                </label>
                <select
                  {...register("jk", { required: "Pilih jenis kelamin" })}
                  className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jk && (
                  <span className="text-[#C53030] text-sm mt-1 block">
                    {errors.jk.message}
                  </span>
                )}
              </div>
            </div>

            {/* Umur dan Nomor HP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A5568] mb-2 font-medium">
                  Umur
                </label>
                <select
                  {...register("umur", { required: "Pilih umur" })}
                  className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
                >
                  {Array.from({ length: 83 }, (_, i) => i + 14).map((umur) => (
                    <option key={umur} value={umur}>
                      {umur} Tahun
                    </option>
                  ))}
                </select>
                {errors.umur && (
                  <span className="text-[#C53030] text-sm mt-1 block">
                    {errors.umur.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[#4A5568] mb-2 font-medium">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  {...register("hp", {
                    required: "Nomor HP wajib diisi",
                    pattern: {
                      value: /^[0-9]{10,13}$/,
                      message: "Format nomor HP tidak valid",
                    },
                  })}
                  className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
                  placeholder="08xxxxxxxxxx"
                />
                {errors.hp && (
                  <span className="text-[#C53030] text-sm mt-1 block">
                    {errors.hp.message}
                  </span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A5568] mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password wajib diisi",
                      minLength: {
                        value: 6,
                        message: "Minimal 6 karakter",
                      },
                    })}
                    className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-4a9.97 9.97 0 01-1.563 3.029"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[#C53030] text-sm mt-1 block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[#4A5568] mb-2 font-medium">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confPassword", {
                      required: "Konfirmasi password wajib diisi",
                      validate: (value) =>
                        value === watch("password") || "Password tidak cocok",
                    })}
                    className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-4a9.97 9.97 0 01-1.563 3.029"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confPassword && (
                  <span className="text-[#C53030] text-sm mt-1 block">
                    {errors.confPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-[#4A5568] mb-2 font-medium">
                Alamat Lengkap
              </label>
              <textarea
                {...register("alamat", { required: "Alamat wajib diisi" })}
                rows="3"
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
              />
              {errors.alamat && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.alamat.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full bg-primary hover:bg-blue-600 text-white  py-4 px-6 rounded-lg font-semibold shadow-sm hover:shadow-md flex items-center hover:scale-[1.02] transition-transform justify-center gap-2"
        >
          Lanjut ke Verifikasi Wajah
        </Button>
      </form>
    </AuthLayout>
  );
};

export default FormRegister;
