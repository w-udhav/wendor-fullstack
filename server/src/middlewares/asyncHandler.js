import { errorHandler } from "./errorHandler.js";

export default function asyncHandler(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
