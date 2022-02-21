import Common from '../../utils/common';
import { ICreateOrder, IOrder, IOrderSeralized } from './order.interfaces';

class Order {
  static tableName: string = 'orders';

  static async create(order: ICreateOrder): Promise<IOrder | null> {
    const insertQuery = await Common.dbInsertion(Order.tableName, order);
    if (insertQuery && insertQuery.inserted) {
      const order = insertQuery.data[0] as IOrder;
      return order;
    } else {
      return null;
    }
  }

  static async findAll(): Promise<IOrderSeralized[]| null> {
    const rows = await Common.dbFetch(Order.tableName);
    return rows as IOrderSeralized[];
  }

  static async findOrderById(id: number): Promise<IOrderSeralized | null> {
    const condition = {id: id};
    const rows = await Common.dbFetch(Order.tableName, condition);
    if(rows?.length){
      const order = rows[0] as IOrderSeralized;
      return order;
    }else{
      return null;
    }
  }
}
export default Order;