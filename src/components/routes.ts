import express, { Express } from 'express';
import userRouter from './user/user.routes';
import productRouter from './product/product.routes';
import orderRouter from './order/order.router';

const apiRouter = express.Router();

apiRouter.use(userRouter);
apiRouter.use(productRouter);
apiRouter.use(orderRouter);

export default apiRouter;