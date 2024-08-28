import BaseService from "./baseService.js";
import ProductRepository from "../repositories/productRepository.js";

class ProductService extends BaseService {
  constructor() {
    const productRepository = new ProductRepository();
    super(productRepository);
  }
}

export default ProductService;
