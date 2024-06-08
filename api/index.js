"use strict";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "../api/Routes/User.routes.js";
import AuthRouter from "../api/Routes/Auth.routes.js";
import cookieParser from "cookie-parser";
import listeningRouter from "./Routes/Listening.routes.js";
import path from 'path';
dotenv.config();

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(process.env.DBCONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
const __dirname = path.resolve();

app.use(cookieParser());

app.use("/api/user/", Router);

app.use("/api/auth", AuthRouter);

app.use("/api/listening", listeningRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    message,
    statuscode,
  });
});
