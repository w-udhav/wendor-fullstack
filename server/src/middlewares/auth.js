import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import asyncHandler from "./asyncHandler.js";
import { AuthenticationError } from "../errors/CustomError.js";
import User from "../models/User.js";

dotenv.config();

const verifyUser = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    req.user = user;
    next();
  } else {
    throw new AuthenticationError("Not authorized to access this route");
  }
});

const optionalAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
    } catch (_) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
});

export { verifyUser, optionalAuth };
