import "express-async-errors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
const app = express();
dotenv.config();
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
//Routers
import jobRouter from "./routers/jobRouters.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./middleware/authMiddleware.js";

//Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//Error Handling
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

app.use(errorHandlerMiddleware);

//Port
try {
  await mongoose.connect(process.env.MONGO_URL);
  const port = process.env.PORT || 5100;
  app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
