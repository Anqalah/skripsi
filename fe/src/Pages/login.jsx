import FormLogin from "../components/Fragments/FormLogin";
import AuthLayout from "../components/Layouts/AuthLayouts";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <FormLogin />
      <p className="text-sm mt-5 text-center ">
        Belum punya akun?{" "}
        <Link to="/register" className="font-bold text-[#457b9d]">
          Daftar
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
