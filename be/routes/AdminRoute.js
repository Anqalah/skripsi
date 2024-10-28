import express from "express";
import {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/Admins.js";
import { verifyUser } from "../middleware/AuthUsers.js";
const router = express.Router();

router.get("/admins", getAdmins);
router.get("/admins/:id", verifyUser, getAdminById);
router.post("/admins", verifyUser, createAdmin);
router.patch("/admins/:id", verifyUser, updateAdmin);
router.delete("/admins/:id", verifyUser, deleteAdmin);

export default router;
