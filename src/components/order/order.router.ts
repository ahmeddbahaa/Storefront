import express from 'express';
import OrderController from './order.controller';

const orderRouter = express.Router();

orderRouter.get('/orders', OrderController.getOrders);
orderRouter.get('/orders/:id', OrderController.getOrderById);
orderRouter.post('/orders', OrderController.create);

export default orderRouter;