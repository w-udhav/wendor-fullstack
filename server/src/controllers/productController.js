import productService from "../services/productService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

class ProductController {
  constructor() {
    this.productService = new productService();

    // Bind methods to the class instance
    this.getAllProducts = this.getAllProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  });

  createProduct = asyncHandler(async (req, res, next) => {
    const product = await this.productService.create(req.body);
    res.status(201).json({ data: product });
  });

  updateProduct = asyncHandler(async (req, res, next) => {
    const product = await this.productService.update(req.params.id, req.body);
    res.status(200).json({ data: product });
  });

  deleteProduct = asyncHandler(async (req, res, next) => {
    await this.productService.delete(req.params.id);
    res.status(204).json({ message: "Product deleted successfully" });
  });
}

export default ProductController;
