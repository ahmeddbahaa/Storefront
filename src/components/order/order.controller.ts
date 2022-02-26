import { Request, Response } from 'express';
import {
  ICreateOrder,
  IOrderProduct,
  IOrderSeralized,
  ORDER_STATUS,
} from './order.interfaces';
import Order from './order.model';
import Logger from '../../middlewares/logger';
class OrderController {
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await Order.findOrderById(+req.params.id);
      if (!order) {
        res.status(400).send('Order Not Found');
      } else {
        res.send(order);
      }
    } catch (error) {
      Logger.log('Order Controller Error: ', error);
    }
  }
  async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const order = await Order.findUserOrders(+req.params.user_id);
      if (!order) {
        res.status(400).send('Order Not Found');
      } else {
        res.send(order);
      }
    } catch (error) {
      Logger.log('Order Controller Error:', error);
    }
  }
  async getCompleteUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const order = await Order.findCompeleteOrders(+req.params.user_id);
      if (!order) {
        res.status(400).send('Order Not Found');
      } else {
        res.send(order);
      }
    } catch (error) {
      Logger.log('Order Controller Error', error);
    }
  }
  async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await Order.findAll();
      res.send(orders);
    } catch (error) {
      Logger.log('Order Controller Error', error);
    }

  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, order_status } = req.body;
      const dataObject: ICreateOrder = { user_id, order_status };
      const order = await Order.create(dataObject);
      res.status(201).send(order);
    } catch (error) {
      Logger.log('Order Controller Error', error);
      res.status(500).send('Error Please Try Again Later');
    }
  }
  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const order_id: number = +req.params.id;
      const quantity:number = parseInt(req.body.quantity);
      const product_id:number = parseInt(req.body.product_id);
      const dataObject: IOrderProduct = { order_id, quantity , product_id };
      const result = await Order.addProduct(dataObject);
      res.status(201).send(result);
    } catch (error) {
      Logger.log('Order Controller Error', error);
      res.status(500).send('Error Please Try Again Later');
    }
  }
}
export default new OrderController();
