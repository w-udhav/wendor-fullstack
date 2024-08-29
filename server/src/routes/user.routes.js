import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();
const userController = new UserController();

router.post("/auth/register", userController.createUser.bind(userController));
router.post("/auth/login", userController.verifyUser.bind(userController));
router.get("/all", userController.getAllUsers.bind(userController));

export default router;
