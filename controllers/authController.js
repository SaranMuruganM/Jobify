import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../error/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const validUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!validUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userID: user.id, role: user.role });

  const oneday = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneday),
    secure: process.env.NODE_ENV == "server",
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged in" });
};

export const register = async (req, res) => {
  const newUser = (await User.countDocuments()) == 0;
  req.body.role = newUser ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
