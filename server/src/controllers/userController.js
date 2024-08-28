import { NotFoundError } from "../errors/CustomError.js";
import UserService from "../services/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await this.userService.getById(req.params.id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.json(user);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        next(new ValidationError(error.message));
      } else {
        next(error);
      }
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await this.userService.delete(req.params.id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
