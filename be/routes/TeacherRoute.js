import express from "express";
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/Teachers.js";
import { verifyUser } from "../middleware/AuthUsers.js";
const router = express.Router();

router.get("/teachers", verifyUser, getTeachers);
router.get("/teachers/:id", verifyUser, getTeacherById);
router.post("/teachers", verifyUser, createTeacher);
router.patch("/teachers/:id", verifyUser, updateTeacher);
router.delete("/teachers/:id", verifyUser, deleteTeacher);

export default router;
