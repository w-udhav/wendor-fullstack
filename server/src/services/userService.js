import BaseService from "./baseService.js";
import UserRepository from "../repositories/UserRepository.js";

class UserService extends BaseService {
  constructor() {
    const userRepository = new UserRepository();
    super(userRepository);
  }
}

export default UserService;
