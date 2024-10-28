import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/Students.js";
import { verifyUser } from "../middleware/AuthUsers.js";
const router = express.Router();

router.get("/students", verifyUser, getStudents);
router.get("/students/:id", verifyUser, getStudentById);
router.post("/students", verifyUser, createStudent);
router.patch("/students/:id", verifyUser, updateStudent);
router.delete("/students/:id", verifyUser, deleteStudent);

export default router;
