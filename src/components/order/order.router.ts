import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import authRouter from '../../middlewares/verfiyAuthToken';
import OrderController from './order.controller';
import { getOrderValidation, getUserOrdersValidation } from './order.schema';

const orderRouter = express.Router();

orderRouter.get('/orders', OrderController.getOrders);
orderRouter.get('/orders/user/:user_id', authRouter, validateRequest(getUserOrdersValidation),
  OrderController.getUserOrders);
orderRouter.get('/orders/user/:user_id/complete', authRouter,
  validateRequest(getUserOrdersValidation), OrderController.getCompleteUserOrders);
orderRouter.get('/orders/:id', validateRequest(getOrderValidation), OrderController.getOrderById);
orderRouter.post('/orders', authRouter, OrderController.create);
orderRouter.post('/orders/:id/products', authRouter, OrderController.addProduct);

export default orderRouter;