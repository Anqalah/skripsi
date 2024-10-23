import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { InputForm } from "../Elements/Input";
import Button from "../Elements/Button";
import { API_BASE_URL } from "../../config/config";

const FormEditTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTeacherById = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTeacherById();
  }, [id]);

  const updateTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_BASE_URL}/users/${id}`, {
        name: name,
        email: email,
        role: role,
        password: password,
        confPassword: confPassword,
      });
      navigate("/admin/teacher");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={updateTeacher}>
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
          onClick={updateTeacher}
          classname="bg-[#03A9F4] w-full"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Fragment>
  );
};

export default FormEditTeacher;
