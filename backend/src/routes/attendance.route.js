import express from "express";
import { deleteAttendance, getAttendanceForMonth, markAttendance,updateAttendance } from "../controllers/attend.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/markAttendance",protectRoute,markAttendance);
router.post("/updateAttendance",protectRoute,updateAttendance);
router.post("/deleteAttendance",protectRoute,deleteAttendance);
router.post("/getMonthData", protectRoute,getAttendanceForMonth)

export default router;