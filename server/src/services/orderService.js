
import InventoryService from './inventoryService.js';
import { OrderItemRepository, OrdersRepository } from '../repositories/orderRepository.js';
import { InternalServerError, NotFoundError, ValidationError } from '../errors/CustomError.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import sequelize from '../config/database.js';

class OrdersService {
    constructor() {
        this.ordersRepository = new OrdersRepository;
        this.orderItemRepository = new OrderItemRepository();
        this.inventoryService = new InventoryService();
    }

    async create(userId, orderProducts) {
        const transaction = await sequelize.transaction();

        try {
            let totalPrice = 0;
            const productDetailsMap = {};

            // Step 1: Calculate total price and check if the total available quantity is sufficient
            for (const orderProduct of orderProducts) {
                if (!orderProduct.productId || !orderProduct.quantity) {
                    throw new ValidationError('Product ID and quantity are required for each product');
                }

                // Fetch product details only once and store them in the map
                if (!productDetailsMap[orderProduct.productId]) {
                    const productDetails = await this.inventoryService.getProductById(orderProduct.productId);

                    if (!productDetails) {
                        throw new NotFoundError(`Product details not found for product ID ${orderProduct.productId}`);
                    }

                    if (productDetails.quantity < orderProduct.quantity) {
                        throw new ValidationError(
                            `Insufficient inventory available for product ${productDetails.name}: ${productDetails.quantity}pcs`
                        );
                    }

                    productDetailsMap[orderProduct.productId] = productDetails;
                }

                const productDetails = productDetailsMap[orderProduct.productId];
                totalPrice += productDetails.dataValues.productPrice * orderProduct.quantity;
            }

            if (totalPrice <= 0) {
                throw new InternalServerError('Total price calculation error.');
            }

            // Step 2: Create the order record
            const order = await Order.create({
                userId,
                orderTotal: totalPrice,
            }, { transaction });

            // Step 3: Deduct inventory and create order items
            for (const orderProduct of orderProducts) {
                const productDetails = productDetailsMap[orderProduct.productId];
                productDetails.quantity -= orderProduct.quantity;
                await productDetails.save({ transaction });

                await OrderItem.create({
                    orderId: order.id,
                    productId: orderProduct.productId,
                    quantity: orderProduct.quantity,
                    purchasePrice: productDetails.dataValues.productPrice,
                }, { transaction });
            }

            // Commit the transaction
            await transaction.commit();

            return order;

        } catch (error) {
            // Rollback the transaction in case of error
            console.log(error)
            await transaction.rollback();
            throw new InternalServerError(500, error.message || 'Error creating order');
        }
    }


    async getAllOrders(page, pageSize) {
        try {
            return await this.ordersRepository.getAllOrders(page, pageSize);
        } catch (error) {
            console.log(error)
            throw new InternalServerError(500, error.message || 'Error fetching all orders');
        }
    }

}

class OrderItemService {
    constructor() {
        this.orderItemRepository = new OrderItemRepository();
    }

    async createOrderItem(orderItemData) {
        try {
            return await this.orderItemRepository.create(orderItemData);
        } catch (error) {
            throw new InternalServerError(error.message || 'Error creating order item');
        }
    }
}

export { OrdersService, OrderItemService };
