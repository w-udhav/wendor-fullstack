import asyncHandler from "../middlewares/asyncHandler.js";
import { OrdersService } from "../services/orderService.js";

class OrderController {
    constructor() {
        this.orderService = new OrdersService();

        // Bind methods to the class instance
        this.getAllOrders = this.getAllOrders.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    getAllOrders = asyncHandler(async (req, res, next) => {
        const orders = await this.orderService.getAllOrders();
        res.status(200).json(orders);
    });

    createOrder = asyncHandler(async (req, res, next) => {
        const order = await this.orderService.create(req.user.id, req.body);
        res.status(201).json({ data: order });
    });
}

export default OrderController;
