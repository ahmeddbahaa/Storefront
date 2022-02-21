import express from 'express';
import CategoryController from './category.controller';
const categoryRouter = express.Router();

categoryRouter.get('/categories', CategoryController.getCategories);
categoryRouter.post('/categories', CategoryController.create);
export default categoryRouter;