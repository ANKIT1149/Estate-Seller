import User from "../Models/User.module.js";
import { ErrorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message: "Hello Ankit"
    })
};

export const updateUser = async (req, res, next) => {
     if(req.user.id !== req.params.id) return next(ErrorHandler(401, 'You can update your own account'));
     
     try {
       if(req.body.password){
         req.body.password = bcryptjs.hashSync(req.body.password, 10)
       }

       if(req.body.phone){
         req.body.phone = bcryptjs.hashSync(req.body.phone, 10)
       }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
             $set: {
                 username: req.body.username,
                 email: req.body.email,
                 password: req.body.password,
                 phone: req.body.phone,
                 avatar: req.body.avatar,
             }
        }, {new: true})

        const {password, ...rest} = updateUser._doc;

        res.status(201).json(rest);

     } catch (error) {
        next(error)
     }

}