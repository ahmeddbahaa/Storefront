import Logger from '../../middlewares/logger';
import Common from '../../utils/common';
import { ICategory, ICreateCategory, ICategorySeralized } from './category.interfaces';
class Category {
  static tableName: string = 'categories';
  static async create(category: ICreateCategory): Promise<ICategory | null> {
    try {
      const insertedQuery = await Common.dbInsertion(Category.tableName, category);
      if (insertedQuery && insertedQuery.inserted) {
        const category = insertedQuery.data[0] as ICategory;
        return category;
      }
    } catch (error) {
      Logger.log('Category Model Error: ',error);
    }
    return null;
  }
  static async findAll(): Promise<ICategorySeralized[]|null> {
    try {
      const rows = await Common.dbFetch(Category.tableName);
      if(rows?.length){
        const categories = rows as ICategorySeralized[];
        return categories;
      }
    } catch (error) {
      Logger.log('Category Model Error: ',error);
    }
    return null;

  }
}
export default Category;