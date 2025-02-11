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
  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role === "Admin" && isSuccess) {
      navigate("/admin/dashboard/");
    }
    if (user && user.role === "Teacher" && isSuccess) {
      navigate("/teacher/dashboard");
    }
    if (user && user.role === "Student" && isSuccess) {
      navigate("/student/dashboard");
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          label="Password"
          type="password"
          placeholder="******"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="text-white bg-[#03A9F4] w-full"
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
