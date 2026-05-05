import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";
import attendRoutes from "./routes/attendance.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";


const app = express()
dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(express.json());
app.use(cookieParser())

// for authencation
app.use("/api/auth",authRoutes)

// for attendance
app.use("/api/attend",attendRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB();
})
