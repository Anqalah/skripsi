import express from "express";
import { upload } from "../middleware/Multer.js"; // Sesuaikan dengan lokasi file upload
import { clockIn, clockOut } from "../controllers/Attedances.js";
const router = express.Router();

router.post(
  "/attendance/clock-in/:id",
  upload.single("facePhotoClockIn"),
  clockIn
);
router.post(
  "/attendance/clock-out",
  upload.single("facePhotoClockOut"),
  clockOut
);

export default router;
