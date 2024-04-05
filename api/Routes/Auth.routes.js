import express from "express";

import { signin, Signup } from "../controllers/Auth.controller.js";
import { Signin, Signup } from "../controllers/Auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", Signup);

AuthRouter.post("/signin", signin)

AuthRouter.post("/signin", Signin)


export default AuthRouter;