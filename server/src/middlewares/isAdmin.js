import { AuthorizationError } from "../errors/CustomError.js";
import asyncHandler from "./asyncHandler.js";

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new AuthorizationError();
  }
});

export default isAdmin;
