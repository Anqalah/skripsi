import { Fragment, React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Features/authSlice";
import Button from "../Elements/Button";
import { InputForm } from "../Elements/Input";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && user.role === "admin" && isSuccess) {
      navigate("/dashboard/admin/");
    }
    if (user && user.role === "teacher" && isSuccess) {
      navigate("/dashboard/teacher");
    }
    if (user && user.role === "student" && isSuccess) {
      navigate("/dashboard/student");
    }
    // dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleLogin}>
        <InputForm
          label="Email"
          type="email"
          placeholder="contoh@gmail.com"
          name="email"
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          label="Password"
          type="password"
          placeholder="******"
          name="password"
          value={password}
          onchange={(e) => setPassword(e.target.value)}
        />

        <Button
          classname="bg-[#03A9F4] w-full"
          onClick={handleLogin}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Fragment>
  );
};

export default FormLogin;
