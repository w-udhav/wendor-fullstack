import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";

import ProductController from "../controllers/productController.js";
import { verifyUser } from "../middlewares/auth.js";

const router = Router();
const productController = new ProductController();

router.get("/all", verifyUser, isAdmin, productController.getAllProducts.bind(productController));
router.post("/create", verifyUser, isAdmin, productController.createProduct.bind(productController));
router.put("/:id", verifyUser, isAdmin, productController.updateProduct.bind(productController));
export default router;
