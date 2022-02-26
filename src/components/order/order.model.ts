import Common from '../../utils/common';
import { IProduct, IProductSerialized } from '../product/product.interfaces';
import {
  ICreateOrder,
  IOrder,
  IOrderProduct,
  IOrderProductSeralized,
  IOrderSeralized,
  ORDER_STATUS,
} from './order.interfaces';
import Logger from '../../middlewares/logger';

class Order {
  static tableName: string = 'orders';

  static async create(order: ICreateOrder): Promise<IOrder | null> {
    try {
      const insertQuery = await Common.dbInsertion(Order.tableName, order);
      if (insertQuery && insertQuery.inserted) {
        const order = insertQuery.data[0] as IOrder;
        return order;
      }
    } catch (error) {
      Logger.log('Order Model Error: ', error);
    }
    return null;
  }

  static async findAll(): Promise<IOrderSeralized[] | null> {
    const rows = await Common.dbFetch(Order.tableName);
    return rows as IOrderSeralized[];
  }
  static async findCompeleteOrders(
    user_id: number): Promise<IOrderSeralized[] | null> {
    try {
      const condition = {
        user_id: user_id,
        order_status: ORDER_STATUS.COMPLETE,
      };
      const rows = await Common.dbFetch(Order.tableName, condition);
      if (rows?.length) {
        const orders = rows as IOrderSeralized[];
        return orders;
      }
    } catch (error) {
      Logger.log('Order Model Error: ', error);
    }
    return null;
  }
  static async findUserOrders(user_id: number): Promise<IOrderSeralized[] | null> {
    try {
      const condition = { user_id: user_id };
      const rows = await Common.dbFetch(Order.tableName, condition);
      if (rows?.length) {
        const order = rows as IOrderSeralized[];
        return order;
      }
    } catch (error) {
      Logger.log('Order Model Error: ', error);
    }
    return null;
  }
  static async findOrderById(id: number): Promise<IOrderSeralized | null> {
    try {
      const condition = { id: id };
      const rows = await Common.dbFetch(Order.tableName, condition);
      if (rows?.length) {
        const order = rows[0] as IOrderSeralized;
        return order;
      }
    } catch (error) {
      Logger.log('Order Model Error: ', error);

    }
    return null;
  }

  static async addProduct(order_product: IOrderProduct): Promise<IOrderProductSeralized | null> {
    try {
      const insertedQuery = await Common.dbInsertion('order_products', order_product);
      if(insertedQuery && insertedQuery.inserted){
        const orderProduct = insertedQuery.data[0] as IOrderProductSeralized;
        return orderProduct;
      }
    } catch (error) {
      Logger.log('Order Model Error: ', error);
    }
    return null;
  }
}
export default Order;
