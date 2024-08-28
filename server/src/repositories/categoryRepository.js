import BaseRepository from "./baseRepository.js";
import Category from "../models/Category.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }
}

export default CategoryRepository;
