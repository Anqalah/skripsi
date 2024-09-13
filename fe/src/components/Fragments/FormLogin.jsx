import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../Features/authSlice";
import { InputForm } from "../Elements/Input";
import Button from "../Elements/Button";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPass, setShowPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role === "admin" && isSuccess) {
      navigate("admin/home");
    }
    if (user && user.role === "teacher" && isSuccess) {
      navigate("teacher/home");
    }
    if (user && user.role === "student" && isSuccess) {
      navigate("student/home");
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const Login = (event) => {
    event.preventDefault();
    setTimeout(() => {
      dispatch(LoginUser({ email, password }));
    }, 1000);
  };

  // const toggleShowPass = () => {
  //   setShowPass(!showPass);
  // };

  return (
    <form onSubmit={Login}>
      <InputForm
        label="Email"
        type="email"
        placeholder="contoh@gmail.com"
        name="email"
        value={email}
        onchange={(event) => setEmail(event.target.value)}
      />

      <InputForm
        label="Password"
        type="password"
        placeholder="******"
        name="password"
        value={password}
        onchange={(event) => setPassword(event.target.value)}
      />

      <Button classname="bg-[#03A9F4] w-full " type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
