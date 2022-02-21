import { Request, Response} from 'express';
import { ICreateCategory } from './category.interfaces';
import Category from './category.model';
class CategoryController{
  async getCategories(req: Request, res: Response){
    const rows = await Category.findAll();
    res.send(rows);
  }

  async create(req: Request, res: Response){
    const{name} = req.body;
    const dataObject:ICreateCategory = {name};
    const category = await Category.create(dataObject);
    res.status(201).send(category);
  }
}
export default new CategoryController();