import Common from '../../utils/common';
import { ICategory, ICreateCategory, ICategorySeralized } from './category.interfaces';
class Category {
  static tableName: string = 'categories';
  static async create(category: ICreateCategory): Promise<ICategory | null> {
    const insertedQuery = await Common.dbInsertion(Category.tableName, category);
    if (insertedQuery && insertedQuery.inserted) {
      const category = insertedQuery.data[0] as ICategory;
      return category;
    }else {
      return null;
    }
  }
  static async findAll(): Promise<ICategorySeralized[]|null> {
    const rows = await Common.dbFetch(Category.tableName);
    if(rows?.length){
      const categories = rows as ICategorySeralized[];
      return categories;
    }else{
      return null;
    }
  }
}
export default Category;