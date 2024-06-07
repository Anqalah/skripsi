import FormInput from "../components/Elements/Input";
import Form from "../components/Fragments/Form";
import AuthLayout from "../components/Layouts/AuthLayouts";

const ForgotPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password reset
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Remember your password?"
      linkText="Sign In"
      linkHref="/login"
    >
      <Form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
        />
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
