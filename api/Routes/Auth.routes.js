import express from "express";
<<<<<<< HEAD
import { Signin, Signup } from "../controllers/Auth.controller.js";
=======
import { signin, Signup } from "../controllers/Auth.controller.js";
>>>>>>> dev_Aryansh

const AuthRouter = express.Router();

AuthRouter.post("/signup", Signup);
<<<<<<< HEAD
AuthRouter.post("/signin", Signin)
=======
AuthRouter.post("/signin", signin)
>>>>>>> dev_Aryansh

export default AuthRouter;