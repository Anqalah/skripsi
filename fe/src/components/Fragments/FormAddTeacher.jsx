import React, { Fragment, useState } from "react";
import { InputForm } from "../Elements/Input";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

export const FormAddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const saveTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users`, {
        name: name,
        email: email,
        role: role,
        password: password,
        confPassword: confPassword,
      });
      navigate("/admin/teacher");
    } catch (error) {
      {
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={saveTeacher}>
        <InputForm
          label="Name"
          type="text"
          placeholder="Masukkan nama anda"
          name="name"
          value={name}
          onchange={(e) => setName(e.target.value)}
        />
        <InputForm
          label="email"
          type="email"
          placeholder="contoh@gmail.com"
          name="email"
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
        <InputForm
          label="Role"
          type="text"
          placeholder="Guru/Murid/Admin"
          name="role"
          value={role}
          onchange={(e) => setRole(e.target.value)}
        />
        <InputForm
          label="password"
          type="password"
          placeholder="******"
          name="password"
          value={password}
          onchange={(e) => setPassword(e.target.value)}
        />
        <InputForm
          label="Confirm Password"
          type="password"
          placeholder="******"
          name="confirmPassword"
          value={confPassword}
          onchange={(e) => setConfPassword(e.target.value)}
        />
        <Button
          onClick={saveTeacher}
          classname="bg-[#03A9F4] w-full"
          type="submit"
        >
          Register
        </Button>
      </form>
    </Fragment>
  );
};
