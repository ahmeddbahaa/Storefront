import { Request, Response} from 'express';
import Product from './product.model';
import { ICreateProduct, IProductSerialized } from './product.interfaces';
import Logger from '../../middlewares/logger';
class ProductController {

  async getProductById(req: Request, res: Response): Promise<void>{
    try {
      const product = await Product.findOneById(+req.params.id);
      if(!product){
        res.status(404).send({ message: 'Product Not Found!' });
      }
      res.send(product);
    } catch (error) {
      Logger.log('Product Controller Error', error);
    }
  }

  async getProducts(req: Request, res: Response): Promise<void>{
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      Logger.log('Product Controller Error', error);
    }

  }

  async create(req: Request, res: Response): Promise<void>{
    try {
      let {name,price,category_id} = req.body;
      price = parseInt(price);
      let dataObject:ICreateProduct;
      if(category_id==undefined)
        dataObject = {name,price};
      else{
        dataObject = {name,price,category_id};
      }
      const product = await Product.create(dataObject);
      res.status(201).send(product);
    } catch (error) {
      Logger.log('Product Controller Error', error);
    }
  }
}

export default  new ProductController();