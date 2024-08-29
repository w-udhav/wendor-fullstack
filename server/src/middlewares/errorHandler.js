import { CustomError } from "../errors/CustomError.js";

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message });
  }

  res.status(500).json({ status: "error", message: "Something went wrong" });
};
