import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log("A user connected");
});

import userRouter from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
// // routes for the user
app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRoutes);
app.use("/api/v1/messages", messagesRoutes);

export { server, io };
