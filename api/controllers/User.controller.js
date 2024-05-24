import Listening from "../Models/Listening.module.js";
import User from "../Models/User.module.js";
import { ErrorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Hello Ankit",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(ErrorHandler(401, "You can update your own account"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.phone) {
      req.body.phone = bcryptjs.hashSync(req.body.phone, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, phone, ...rest } = updateUser._doc;

    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(ErrorHandler(401, "You can delete your own acoount"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_Token");
    res.status(201).json("User deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getListinguser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listening.find({ userRef: req.params.id });
      res.status(201).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(ErrorHandler(401, "You can view only your own account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(ErrorHandler(401, "User not found"));

    const { password: pass, ...rest } = user._doc;

    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
