import User from "../Models/User.module.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/Error.js";
import jwt from "jsonwebtoken";
// import { ErrorHandler } from "../utils/Error.js";

export const Signup = async (req, res, next) => {
  const { username, email, password, phone } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const hashedPhone = bcryptjs.hashSync(phone, 10)
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
    phone,
  });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};

export const Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validationUser = await User.findOne({ email });
    if (!validationUser)
      return next(ErrorHandler(404, "Invalid Email Address"));
    const validationPassword = bcryptjs.compareSync(
      password,
      validationUser.password
    );
    if (!validationPassword) return next(ErrorHandler(401, "Wrong Credential"));
    const token = jwt.sign({ id: validationUser._id }, process.env.SECRET_CODE);
    const { passwrod: pass, ...rest } = validationUser._doc;
    res
      .cookie("access_Token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const Google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_CODE);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const GeneratedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(GeneratedPassword, 10);
      const generatedPhoneNumber =   Math.random().toString(36).slice(-2) +
      Math.random().toString(36).slice(-3);
      const hashedPhone = bcryptjs.hashSync(generatedPhoneNumber, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedpassword,
        phone: hashedPhone,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_CODE);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
