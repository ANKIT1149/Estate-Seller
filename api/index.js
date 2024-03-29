import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "../api/Routes/User.routes.js";
import AuthRouter from "../api/Routes/Auth.routes.js"
dotenv.config();

mongoose.connect(process.env.MONGOOSE).then(() => {
     console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
});

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use(express.json());

app.use("/api/user", Router);

app.use('/api/auth', AuthRouter);