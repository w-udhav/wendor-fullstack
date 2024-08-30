
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';


class OrdersRepository {
    async create(orderData, transaction) {
        try {
            return await Order.create(orderData, { transaction });
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    async getAllOrders(page, pageSize) {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;
        const { count, rows } = await Order.findAndCountAll({
            attributes: ['id', 'orderTotal', 'createdAt'],
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['name', 'price']
                        }
                    ]
                }
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const orders = rows.map(order => {
            return {
                id: order.id,
                orderTotal: order.orderTotal,
                createdAt: order.createdAt,
                products: order.orderItems.map(orderItem => ({
                    name: orderItem.product.name,
                    quantity: orderItem.quantity,
                    purchasePrice: orderItem.purchasePrice
                }))
            };
        });

        return { totalCount: count, orders: orders };
    }

}

class OrderItemRepository {
    async create(orderItemData, transaction) {
        return await OrderItem.create(orderItemData, { transaction });
    }
}

export { OrdersRepository, OrderItemRepository };
