import User from "../Models/User.module.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/Error.js";

import jwt from "jsonwebtoken"
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

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
      const validateUser = await User.findOne({email});
      if(!validateUser) return next(ErrorHandler(404, "EMail Address Not Found"));
      const validatePAssword =  bcryptjs.compareSync(password, validateUser.password);
      if(!validatePAssword) return next(ErrorHandler(401, 'Wrong Credential'))
    //   const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    // const { password: pass, ...rest } = validateUser._doc;
    // res
    //   .cookie('access_token', token, { httpOnly: true })
    //   .status(200)
    //   .json(rest);
  } catch (error) {
    next(error);
  }
}
