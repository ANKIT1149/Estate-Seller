import User from "../Models/User.module.js";
import bcryptjs from "bcryptjs";
// import { ErrorHandler } from "../utils/Error.js";

export const Signup = async (req, res, next) => {
     const {username, email, password, phone} = req.body;
     const hashedpassword = bcryptjs.hashSync(password, 10);
     const newUser = new User({username, email, password: hashedpassword, phone});
       try {
            await newUser.save();
            res.status(201).json("User Created Successfully");
            
          
       } catch (error) {
         next(error)
       }
     
}
