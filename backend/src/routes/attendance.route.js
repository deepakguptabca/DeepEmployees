import express from "express";
import { markAttendance,updateAttendance } from "../controllers/attend.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/markAttendance",protectRoute,markAttendance);
router.post("/updateAttendance",protectRoute,updateAttendance);


export default router;