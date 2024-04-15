import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

import userRouter from "./routes/userRoutes.js";
import animalRouter from "./routes/listingRoutes.js";
// // routes for the user
app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", animalRouter);

export { app };
