import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import { Signin, Signup } from "../controllers/Auth.controller.js";
=======
import { signin, Signup } from "../controllers/Auth.controller.js";
>>>>>>> dev_Aryansh
=======

import { signin, Signup } from "../controllers/Auth.controller.js";
import { Signin, Signup } from "../controllers/Auth.controller.js";
>>>>>>> db20cabcd2a7431600925157887fc4cb5d4de0b4

const AuthRouter = express.Router();

AuthRouter.post("/signup", Signup);
<<<<<<< HEAD
<<<<<<< HEAD
AuthRouter.post("/signin", Signin)
=======
AuthRouter.post("/signin", signin)
>>>>>>> dev_Aryansh
=======

AuthRouter.post("/signin", signin)

AuthRouter.post("/signin", Signin)

>>>>>>> db20cabcd2a7431600925157887fc4cb5d4de0b4

export default AuthRouter;