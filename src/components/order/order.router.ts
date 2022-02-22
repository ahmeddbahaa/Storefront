import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import OrderController from './order.controller';
import { getOrderValidation } from './order.schema';

const orderRouter = express.Router();

orderRouter.get('/orders', OrderController.getOrders);
orderRouter.get('/orders/:id', validateRequest(getOrderValidation),OrderController.getOrderById);
orderRouter.post('/orders', OrderController.create);
orderRouter.post('/orders/:id/products', OrderController.addProduct);

export default orderRouter;