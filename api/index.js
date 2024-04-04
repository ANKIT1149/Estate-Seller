import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "../api/Routes/User.routes.js";
import AuthRouter from "../api/Routes/Auth.routes.js"
dotenv.config();

const app = express();

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

mongoose.connect(process.env.MONGOOSE).then(() => {
     console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
});


app.use(express.json());

app.use("/api/user", Router);

app.use('/api/auth', AuthRouter);

app.use((err, req, res, next) => {
     const statuscode = err.statuscode || 500;
     const message = err.message || 'Internal Server Error';
     return res.status(statuscode).json({
         success: false,
         message,
         statuscode,
     }) 
})