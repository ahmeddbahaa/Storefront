import Common from '../../utils/common';
import { ICreateProduct, IProduct, IProductSerialized } from './product.interfaces';

class Product {
  static tableName: string = 'products';

  static async create(product: ICreateProduct) : Promise <IProduct | null> {
    const insertQUery = await Common.dbInsertion(Product.tableName, product);
    if(insertQUery && insertQUery.inserted){
      const newProduct = insertQUery.data[0] as IProduct;
      console.log(newProduct);
      return newProduct;
    }else{
      console.log(insertQUery);
      return null;
    }
  }

  static async findOneById(id:number):Promise<IProductSerialized | null> {
    const rows = await Common.dbFetch(Product.tableName, { id });
    if(rows?.length){
      const product = rows[0] as IProductSerialized;
      return product;
    }else{
      return null;
    }
  }

  static async findAll(): Promise<IProductSerialized[]>{
    const rows = await Common.dbFetch(Product.tableName, null, [
      'id',
      'name',
      'price',
      'category_id',
    ]);
    return rows as IProductSerialized[];
  }
}

export default Product;
