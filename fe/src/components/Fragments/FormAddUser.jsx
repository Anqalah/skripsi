import React from "react";
import { InputForm } from "../Elements/Input";

const FormAddUser = () => {
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return <InputForm></InputForm>;
};
