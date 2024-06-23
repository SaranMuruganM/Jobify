import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModels.js";
import User from "../models/userModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { request } from "http";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userID });
  const userWithoutPassword = user.toUSER();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const job = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, job });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    obj.avatar = response.secure_url;
    obj.avatarPublicId = response.public_id;
  }
  const updateUser = await User.findByIdAndUpdate(req.user.userID, obj);
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
