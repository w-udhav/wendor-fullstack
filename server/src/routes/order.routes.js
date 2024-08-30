import { Router } from "express";
import { verifyUser } from "../middlewares/auth.js";
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
    verifyUser,
    orderController.createOrder.bind(orderController)
);

export default router;
