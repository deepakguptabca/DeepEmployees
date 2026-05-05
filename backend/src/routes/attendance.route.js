import express from "express";
import { markAttendance } from "../controllers/attend.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/markAttendance",protectRoute,markAttendance);



export default router;