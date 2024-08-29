import { Router } from "express";

import UserController from "../controllers/userController.js";
import { verifyUser } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();
const userController = new UserController();

router.post("/auth/register", userController.createUser.bind(userController));
router.post("/auth/login", userController.verifyUser.bind(userController));

router.get("/all", verifyUser, userController.getAllUsers.bind(userController));
router.delete(
  "/:id",
  verifyUser,
  isAdmin,
  userController.deleteUser.bind(userController)
);
router.get("/:id", userController.getUserById.bind(userController));

export default router;
