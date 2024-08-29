import { NotFoundError } from "../errors/CustomError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import UserService from "../services/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();

    // Bind methods to the class instance
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await this.userService.getAll();
    res.json(users);
  });

  getUserById = asyncHandler(async (req, res, next) => {
    const user = await this.userService.getUserById(req.params.id);
    res.json(user);
  });

  createUser = asyncHandler(async (req, res, next) => {
    const { user, token } = await this.userService.create(req.body);
    res.status(201).json({ token, user });
  });

  verifyUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, token } = await this.userService.loginUser(email, password);
    res.status(200).json({ token, user });
  });

  updateUser = asyncHandler(async (req, res, next) => {});

  deleteUser = asyncHandler(async (req, res, next) => {
    await this.userService.deleteUser(req.params.id);
    res.status(204).json({ message: "User deleted successfully" });
  });
}

export default UserController;
