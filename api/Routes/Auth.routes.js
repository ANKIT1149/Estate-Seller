import express from "express";
import { Google, Signin, Signout, Signup } from "../controllers/Auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", Signup);

AuthRouter.post("/signin", Signin);

AuthRouter.post("/google", Google);

AuthRouter.get("/signout", Signout);
export default AuthRouter;