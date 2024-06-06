import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="name"
        type="text"
        placeholder="Masukkan nama anda"
        name="name"
      />
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
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="******"
        name="confirmPassword"
      />
      <Button classname="bg-[#03A9F4] w-full">Register</Button>
    </form>
  );
};
export default FormRegister;
