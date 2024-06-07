// import FormLogin from "../components/Fragments/FormLogin";
import AuthLayout from "../components/Layouts/AuthLayouts";
// import InputForm from "../components/Elements/Input";
// import FormLogin from "../components/Fragments/FormLogin";
import FormInput from "../components/Elements/Input";
import { FcGoogle } from "react-icons/fc";
import Form from "../components/Fragments/Form";

// const LoginPage = () => {
//   return (
//     <AuthLayout title="Login" type="login">
//       <FormLogin />
//     </AuthLayout>
//   );
// };

// export default LoginPage;

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Enter your personal details to use all of site features"
      linkText="Register"
      linkHref="/register"
      >
      
      <a
        href="#"
        className="flex items-center justify-center px-4 py-2 mb-4 bg-white text-black rounded-full border border-gray-300 hover:bg-gray-100 transition"
      >
        <FcGoogle className="mr-2" />
        Login with Google
      </a>
      <Form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
        />
      </Form>
      <a
        href="/forgot-password"
        className="text-sm text-purple-800 hover:underline"
      >
        Forgot password?
      </a>
    </AuthLayout>
  );
};

export default LoginPage;
