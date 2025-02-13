import { useForm } from "react-hook-form";
import Button from "../Elements/Button";
import AuthLayout from "../Layouts/AuthLayouts";
import { Link } from "react-router-dom";

const FormRegister = ({ initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const divisions = [
    "Teknik Informatika",
    "Sistem Informasi",
    "Manajemen",
    "Akuntansi",
    "Desain Komunikasi Visual",
  ];

  const validatePassword = (value) => {
    return value === watch("password") || "Password tidak cocok";
  };

  return (
    <AuthLayout type={"register"} title={"Daftar Akun Baru"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Divisi dan Jenis Kelamin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A5568] mb-2 font-medium">
                Bidang/Divisi
              </label>
              <select
                {...register("division", { required: "Pilih divisi" })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
              >
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.division.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[#4A5568] mb-2 font-medium">
                Jenis Kelamin
              </label>
              <select
                {...register("gender", { required: "Pilih jenis kelamin" })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.gender && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.gender.message}
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
                {...register("age", { required: "Pilih umur" })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365] bg-white"
              >
                {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                  <option key={age} value={age}>
                    {age} Tahun
                  </option>
                ))}
              </select>
              {errors.age && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.age.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[#4A5568] mb-2 font-medium">
                Nomor HP
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Nomor HP wajib diisi",
                  pattern: {
                    value: /^[0-9]{10,13}$/,
                    message: "Format nomor HP tidak valid",
                  },
                })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
                placeholder="08xxxxxxxxxx"
              />
              {errors.phone && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.phone.message}
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
              <input
                type="password"
                {...register("password", {
                  required: "Password wajib diisi",
                  minLength: {
                    value: 6,
                    message: "Minimal 6 karakter",
                  },
                })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
              />
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
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Konfirmasi password wajib diisi",
                  validate: validatePassword,
                })}
                className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
              />
              {errors.confirmPassword && (
                <span className="text-[#C53030] text-sm mt-1 block">
                  {errors.confirmPassword.message}
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
              {...register("address", { required: "Alamat wajib diisi" })}
              rows="3"
              className="w-full p-3 border border-[#2A4365]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#2A4365]"
            />
            {errors.address && (
              <span className="text-[#C53030] text-sm mt-1 block">
                {errors.address.message}
              </span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full bg-primary hover:bg-blue-600 text-white  py-3.5 px-6 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md flex items-center justify-center hover:scale-[1.02] transition-transform justify-center gap-2"
        >
          Lanjut ke Verifikasi Wajah
        </Button>
      </form>
    </AuthLayout>
  );
};

export default FormRegister;
