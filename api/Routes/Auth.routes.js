import express from "express";
import { signin, Signup } from "../controllers/Auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", Signup);
AuthRouter.post("/signin", signin)

export default AuthRouter;