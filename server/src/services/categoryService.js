import BaseService from "./baseService.js";
import CategoryRepository from "../repositories/categoryRepository.js";

class CategoryService extends BaseService {
  constructor() {
    const categoryRepository = new CategoryRepository();
    super(categoryRepository);
  }
}

export default CategoryService;
