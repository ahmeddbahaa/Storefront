import { Request, Response} from 'express';
import Logger from '../../middlewares/logger';
import { ICreateCategory } from './category.interfaces';
import Category from './category.model';
class CategoryController{
  async getCategories(req: Request, res: Response){
    try {
      const rows = await Category.findAll();
      res.send(rows);
    } catch (error) {
      Logger.log('Category Controller Error: ',error);
    }
  }

  async create(req: Request, res: Response){
    try {
      const{name} = req.body;
      const dataObject:ICreateCategory = {name};
      const category = await Category.create(dataObject);
      res.status(201).send(category);
    } catch (error) {
      Logger.log('Category Controller Error: ',error);
    }
  }
}
export default new CategoryController();