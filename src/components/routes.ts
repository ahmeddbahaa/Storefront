import express, { Express } from 'express';
import userRouter from './user/user.routes';
import productRouter from './product/product.routes';
const apiRouter = express.Router();

apiRouter.use(userRouter);
apiRouter.use(productRouter);

export default apiRouter;