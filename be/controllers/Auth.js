import argon2 from "argon2";
import Admins from "../models/AdminModel.js";
import Teachers from "../models/TeacherModel.js";
import Students from "../models/StudentModel.js";
import PendingRegistration from "../models/PendingRegistration.js";
import axios from "axios";
import crypto from "crypto";

const findUserByEmail = async (email) => {
  return (
    (await Admins.findOne({ where: { email } })) ||
    (await Teachers.findOne({ where: { email } })) ||
    (await Students.findOne({ where: { email } }))
  );
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });

    const match = await argon2.verify(user.password, password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });

    req.session.userId = user.uuid;
    res
      .status(200)
      .json({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
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

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak Dapat Logout" });
    res.status(200).json({ msg: "Logout Berhasil" });
  });
};

export const registerInitial = async (req, res) => {
  try {
    const { password, confPassword, email, ...userData } = req.body;
    if (password !== confPassword)
      return res.status(400).json({ error: "Password tidak cocok" });
    if (await Students.findOne({ where: { email } }))
      return res.status(400).json({ error: "Email sudah terdaftar" });

    const hashPassword = await argon2.hash(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const pendingUser = await PendingRegistration.create({
      ...userData,
      email,
      password: hashPassword,
      verification_token: verificationToken,
      expires_at: expiresAt,
    });

    res.json({
      msg: "Registration Successful",
      verification_token,
      expires_at,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerComplete = async (req, res) => {
  try {
    const { verification_token, face_image } = req.body;
    if (!verification_token || !face_image)
      return res.status(400).json({ error: "Data tidak lengkap" });

    const pending = await PendingRegistration.findOne({
      where: { verification_token },
    });
    if (!pending || new Date() > pending.expires_at)
      return res
        .status(400)
        .json({ error: "Token tidak valid atau kedaluwarsa" });

    const mlResponse = await axios.post("http://localhost:5000/verify-face", {
      image: face_image,
    });
    if (mlResponse.data.error)
      return res
        .status(400)
        .json({ error: `Verifikasi wajah gagal: ${mlResponse.data.error}` });

    const student = await Students.create({
      ...pending.dataValues,
      face_embedding: JSON.stringify(mlResponse.data.encoding),
      face_image,
      role: "Student",
    });

    await pending.destroy();
    res.json({
      success: true,
      data: { id: student.id, name: student.name, email: student.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal menyelesaikan registrasi" });
  }
};

export const deleteRegister = async (req, res) => {
  try {
    const { token } = req.params;
    await PendingRegistration.destroy({ where: { verification_token: token } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data pending" });
  }
};
