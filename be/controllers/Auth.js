import argon2 from "argon2";
import Admins from "../models/AdminModel.js";
import Teachers from "../models/TeacherModel.js";
import Students from "../models/StudentModel.js";

export const Login = async (req, res) => {
  let user = await Admins.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    user = await Teachers.findOne({
      where: {
        email: req.body.email,
      },
    });
  }
  if (!user) {
    user = await Students.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
    // Verifikasi password
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    // Set session userId
    req.session.userId = user.uuid;
    // Ambil informasi user
    const { uuid, name, email, role } = user;
    res.status(200).json({ uuid, name, email, role });
  }
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
  }
  // Mencari user di tabel admins
  let user = await Admins.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: { uuid: req.session.userId },
  });
  // Mencari user di tabel teachers
  if (!user) {
    user = await Teachers.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: { uuid: req.session.userId },
    });
  }
  // Jika masih tidak ditemukan, cari di tabel students
  if (!user) {
    user = await Students.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: { uuid: req.session.userId },
    });
  }
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak Dapat Logout" });
  });
  res.status(200).json({ msg: "Logout Berhasil" });
};
