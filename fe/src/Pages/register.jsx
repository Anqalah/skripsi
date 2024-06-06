import FormRegister from "../components/Fragments/FormRegister";
import AuthLayout from "../components/Layouts/AuthLayouts";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <FormRegister />
      <p className="text-sm mt-5 text-center ">
        Sudah punya akun{" "}
        <Link to="/login" className="font-bold text-[#457b9d]">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
