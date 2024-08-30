import BaseService from "./baseService.js";
import UserRepository from "../repositories/userRepository.js";
import {
  AuthenticationError,
  CustomError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../errors/CustomError.js";

class UserService extends BaseService {
  constructor() {
    const userRepository = new UserRepository();
    super(userRepository);
    this.userRepository = userRepository;
  }

  async create(data) {
    try {
      if (!data.email || !data.fullName || !data.password) {
        throw new ValidationError("All fields required!");
      }

      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) throw new ValidationError("User already exists");

      const user = await this.userRepository.create(data);
      if (!user) throw new InternalServerError();

      const token = user.generateToken();
      return { user, token };
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async loginUser(email, password) {
    try {
      if (!email || !password)
        throw new ValidationError("Email and password required!");

      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new NotFoundError();

      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new AuthenticationError("Invalid credentials");

      const token = user.generateToken();
      return { user, token };
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  async deleteUser(id) {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

export default UserService;
