import argon2 from "argon2";
import Admins from "../models/AdminModel.js";
import Teachers from "../models/TeacherModel.js";
import Students from "../models/StudentModel.js";
import PendingRegistration from "../models/PendingRegistration.js";
import axios from "axios";
import crypto from "crypto";

export const Login = async (req, res) => {
  const { email: reqEmail, password } = req.body;
  // Mencari pengguna di semua tabel
  const user =
    (await Admins.findOne({ where: { email: reqEmail } })) ||
    (await Teachers.findOne({ where: { email: reqEmail } })) ||
    (await Students.findOne({ where: { email: reqEmail } }));
  // Jika pengguna tidak ditemukan
  if (!user) {
    return res.status(404).json({ msg: "User Tidak Ditemukan" });
  }
  // Verifikasi password
  const match = await argon2.verify(user.password, password);
  if (!match) {
    return res.status(400).json({ msg: "Password Salah" });
  }
  // Set session userId
  req.session.userId = user.uuid;
  // Ambil informasi user
  const { uuid, name, email: userEmail, role } = user;
  res.status(200).json({ uuid, name, email: userEmail, role });
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

export const registerInitial = async (req, res) => {
  try {
    const { password, confPassword, ...userData } = req.body;
    // Validasi dasar
    if (password !== confPassword) {
      return res.status(400).json({ error: "Password tidak cocok" });
    }
    // Cek email unik
    const existing = await Students.findOne({
      where: { email: userData.email },
    });
    if (existing)
      return res.status(400).json({ error: "Email sudah terdaftar" });
    // Hash password
    const hashPassword = await argon2.hash(password);

    // Generate token (32 karakter acak)
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Set waktu kedaluwarsa (misal: 24 jam dari sekarang)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Buat pending registration
    const pendingUser = await PendingRegistration.create({
      ...userData,
      password: hashPassword,
      verification_token: verificationToken,
      expires_at: expiresAt,
    });
    res.json({
      verification_token: pendingUser.token,
      expires_at: pendingUser.expiresAt,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerComplete = async (req, res) => {
  try {
    const { verification_token, face_image } = req.body;

    // Cari pending registration
    const pending = await PendingRegistration.findOne({
      where: { verificationToken: verification_token },
    });

    if (!pending) return res.status(400).json({ error: "Token tidak valid" });
    if (new Date() > pending.expiresAt) {
      return res.status(400).json({ error: "Token kedaluwarsa" });
    }

    // Verifikasi ke Flask
    const mlResponse = await axios.post("http://localhost:5000/verify-face", {
      image: face_image,
    });

    if (mlResponse.data.error) {
      return res.status(400).json({
        error: `Verifikasi wajah gagal: ${mlResponse.data.error}`,
      });
    }

    // Buat user
    const student = await Students.create({
      ...pending.dataValues,
      face_embedding: JSON.stringify(mlResponse.data.encoding),
      face_image: face_image,
      role: "Student", // Simpan sebagai base64
    });

    // Hapus pending
    await pending.destroy();

    res.json({
      success: true,
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("Complete registration error:", error);
    res.status(500).json({ error: "Gagal menyelesaikan registrasi" });
  }
};
