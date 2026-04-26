import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";


const app = express()
dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(express.json());

// for authencation
app.use("/api/auth",authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
