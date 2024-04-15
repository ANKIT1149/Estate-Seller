"use strict";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "../api/Routes/User.routes.js";
import AuthRouter from "../api/Routes/Auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(
    "mongodb+srv://Aryansh:ARYANSH46277@mern-estate.ly8pgzp.mongodb.net/mern-estate?retryWrites=true&w=majority&appName=mern-estate"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use(cookieParser())

app.use("/api/user/", Router);

app.use("/api/auth", AuthRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    message,
    statuscode,
  });
});
