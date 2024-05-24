import express from "express";
import {
  deleteUser,
  getListinguser,
  getUser,
  test,
  updateUser,
} from "../controllers/User.controller.js";
import { VerifyToken } from "../utils/Verifyuser.js";

const Router = express.Router();

Router.get("/test", test);

Router.post("/update/:id", VerifyToken, updateUser);

Router.delete("/delete/:id", VerifyToken, deleteUser);

Router.get("/listings/:id", VerifyToken, getListinguser);

Router.get("/:id", VerifyToken, getUser);

export default Router;
