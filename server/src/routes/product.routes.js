import { Router } from "express";
import { verifyUser } from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

import ProductController from "../controllers/productController.js";

const router = Router();
const productController = new ProductController();

router.get("/all", productController.getAllProducts.bind(productController));
router.post("/create", productController.createProduct.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
export default router;
