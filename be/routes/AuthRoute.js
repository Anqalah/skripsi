import express from "express";
import {
  Login,
  Logout,
  Me,
  registerInitial,
  registerComplete,
} from "../controllers/Auth.js";
const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.post("/register", registerInitial);
router.post("/register/complete", registerComplete);
router.delete("/logout", Logout);

export default router;
