import FormInput from "../components/Elements/Input";
import InputForm from "../components/Elements/Input";
import Form from "../components/Fragments/Form";
import FormRegister from "../components/Fragments/FormRegister";
import AuthLayout from "../components/Layouts/AuthLayouts";

// const RegisterPage = () => {
//   return (
//     <AuthLayout title="Register" type="register">
//       <FormRegister />
//     </AuthLayout>
//   );
// };

// export default RegisterPage;
const RegisterPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration
  };

  return (
    <AuthLayout
      title="Hello, Friend!"
      subtitle="Register with your personal details to use all of site features"
      linkText="Login"
      linkHref="/login"
    >
      <a
        href="#"
        className="flex justify-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-800 transition"
      >
        Register with Google
      </a>
      <Form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          id="name"
          placeholder="Enter your name"
        />
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
          placeholder="Create a password"
        />
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
