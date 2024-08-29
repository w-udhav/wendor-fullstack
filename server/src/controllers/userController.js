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
    const user = await this.userService.getById(req.params.id);
    if (!user) throw new NotFoundError("User not found");
    res.json(user);
  });

  createUser = asyncHandler(async (req, res, next) => {
    const { user, token } = await this.userService.create(req.body);
    res.status(201).json({ token, user });
  });

  verifyUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, token } = await this.userService.loginUser(email, password);
    if (!user) throw new NotFoundError("User not found");
    res.status(200).json({ token, user });
  });

  updateUser = asyncHandler(async (req, res, next) => {
    const user = await this.userService.update(req.params.id, req.body);
    if (!user) throw new NotFoundError("User not found");
    res.json(user);
  });

  deleteUser = asyncHandler(async (req, res, next) => {
    const user = await this.userService.delete(req.params.id);
    if (!user) throw new NotFoundError("User not found");
    res.status(204).end();
  });
}

export default UserController;
