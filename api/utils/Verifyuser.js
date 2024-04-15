// import { ErrorHandler } from "./Error";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/Error.js";

export const VerifyToken = (req, res, next) => {
     const token = req.cookies.access_Token;

     if(!token) return next(ErrorHandler(401, 'UnAuthorized'));

     jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
         if(err) return next(ErrorHandler(403, 'Forbiddden'));

         req.user = user;

         next();
     })
}