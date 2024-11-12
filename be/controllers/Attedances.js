import Attendances from "../models/AttendanceModel.js";
import Students from "../models/StudentModel.js";
import path from "path";

export const clockIn = async (req, res) => {
  const user = await Students.findOne({
    where: { uuid: req.params.id },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  const { locationClockIn } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ msg: "Mohon unggah wajah" });
  const ext = path.extname(file.originalname); // Ambil ekstensi file
  const facePhotoClockInFile = `clockin_${Date.now()}${ext}`; // Gunakan timestamp // Ambil nama file dari req.file
  try {
    const date = new Date().toISOString().split("T")[0];
    const userId = user.id; // Tanggal hari ini
    // const existingAttendance = await Attendances.findOne({
    //   where: {
    //     studentId: userId,
    //     date: date,
    //   },
    // });
    // if (existingAttendance) {
    //   return res.status(400).json({ msg: "Sudah melakukan clock in hari ini" });
    // }

    const newAttendance = await Attendances.create({
      studentId: userId,
      clockIn: new Date(),
      locationClockIn,
      facePhotoClockIn: facePhotoClockInFile,
      facePhotoClockInUrl: `/uploads/attendances/${facePhotoClockInFile}`,
      date: date,
    });
    res.status(201).json({ msg: "Clock in berhasil", data: newAttendance });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const clockOut = async (req, res) => {
  const studentId = getStudentIdFromSession(req);
  const { locationClockOut, facePhotoClockOutUrl } = req.body;
  if (!studentId) {
    return res.status(401).json({ msg: "User tidak terautentikasi" });
  }
  // Pengecekan ID pengguna berdasarkan UUID
  const user = await Students.findOne({
    where: { uuid: req.params.id },
  });
  if (!user) {
    return res.status(404).json({ msg: "User Tidak Ditemukan" });
  }
  try {
    const date = new Date().toISOString().split("T")[0]; // Tanggal hari ini
    const existingAttendance = await Attendances.findOne({
      where: {
        studentId: user.id,
        date: date,
      },
    });
    if (!existingAttendance) {
      return res.status(404).json({ msg: "Belum melakukan clock in hari ini" });
    }
    await Attendances.update(
      {
        clockOut: new Date(),
        locationClockOut,
        facePhotoClockOutUrl: facePhotoClockOutUrl
          ? `/assets/attendances/${facePhotoClockOutUrl}`
          : null,
      },
      {
        where: { id: existingAttendance.id },
      }
    );
    res
      .status(200)
      .json({ msg: "Clock out berhasil", data: existingAttendance });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
