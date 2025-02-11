import { useForm } from "react-hook-form";
import Button from "../Elements/Button";

const PersonalDataForm = ({ initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const validatePassword = (value) => {
    return value === watch("password") || "Passwords do not match";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Data Pribadi
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Nama Lengkap</label>
          <input
            {...register("name", { required: "Nama wajib diisi" })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email tidak valid",
              },
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 4,
                  message: "Password minimal 4 karakter",
                },
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: validatePassword,
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        Lanjut ke Verifikasi Wajah
      </Button>
    </form>
  );
};

export default PersonalDataForm;
