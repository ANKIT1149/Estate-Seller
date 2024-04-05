import express from "express";
import { Signin, Signup } from "../controllers/Auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", Signup);

AuthRouter.post("/signin", Signin)


export default AuthRouter;