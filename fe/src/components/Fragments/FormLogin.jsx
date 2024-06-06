import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const FormLogin = () => {
  return (
    <form action="">
      <InputForm
        label="email"
        type="email"
        placeholder="contoh@gmail.com"
        name="email"
      />
      <InputForm
        label="password"
        type="password"
        placeholder="******"
        name="password"
      />
      <Button classname="bg-[#03A9F4] w-full">Login</Button>
    </form>
  );
};
export default FormLogin;
