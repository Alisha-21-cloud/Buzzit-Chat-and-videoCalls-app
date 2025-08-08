import express from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

const app = express()
const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})