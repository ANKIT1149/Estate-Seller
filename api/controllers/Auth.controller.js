import User from "../Models/User.module.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/Error.js";
// import { ErrorHandler } from "../utils/Error.js";

export const Signup = async (req, res, next) => {
     const {username, email, password, phone} = req.body;
     const hashedpassword = bcryptjs.hashSync(password, 10);
     const newUser = new User({username, email, password, phone});
       try {
            await newUser.save();
            res.status(201).json("User Created Successfully");
            
          
       } catch (error) {
         next(error)
       }
     
};

export const Signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const validationUser = User.findOne({email})
    if(!validationUser) return next(ErrorHandler(404, "Invalid Email Address"));
    const validationPassword = bcryptjs.compareSync(password, validationUser.password)
    if(!validationPassword) return next(ErrorHandler(401, "Wrong Credential"));
    
  } catch (error) {
    next(error)
  }
}
