import express from 'express';
import ProductController from './product.controller';
import { validateRequest } from '../../middlewares/validate-request';

import { getProductValidation } from './product.schema';
import authRouter from '../../middlewares/verfiyAuthToken';

const productRouter = express.Router();

productRouter.get('/products', ProductController.getProducts);
productRouter.get('/products/:id', validateRequest(getProductValidation),
  ProductController.getProductById);
productRouter.post('/products', authRouter, ProductController.create);

export default productRouter;
