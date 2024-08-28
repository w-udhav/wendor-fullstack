import { CustomError } from "../errors/CustomError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  console.log(err);
  res.status(500).json({ status: "error", message: "Something went wrong" });
};
