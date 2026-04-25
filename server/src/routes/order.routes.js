import { Router } from "express";
import { verifyUser, optionalAuth } from "../middlewares/auth.js";
import OrderController from "../controllers/orderController.js";

const router = Router();
const orderController = new OrderController();

router.get(
    "/",
    verifyUser,
    orderController.getAllOrders.bind(orderController)
);
router.post(
    "/create",
    optionalAuth,
    orderController.createOrder.bind(orderController)
);

export default router;
