import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
const PORT = 3000 || process.env.PORT

import "dotenv/config.js";
import { connectDB } from "./config/db.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//user auth routes
import userAuthRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userAuthRoutes);

//error handling middleware
app.use((err, req, res, next) => {  
  console.log(err)
  const statusCode = err.status || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  connectDB()
  console.log(`server running at http://localhost:${PORT}`);
});
