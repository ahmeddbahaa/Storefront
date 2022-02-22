import { Request, Response } from 'express';
import {
  ICreateOrder,
  IOrderProduct,
  IOrderSeralized,
  ORDER_STATUS,
} from './order.interfaces';
import Order from './order.model';
class OrderController {
  async getOrderById(req: Request, res: Response): Promise<void> {
    const order = await Order.findOrderById(+req.params.id);
    if (!order) {
      res.status(400).send('Order Not Found');
    } else {
      res.send(order);
    }
  }
  async getOrders(req: Request, res: Response): Promise<void> {
    const orders = await Order.findAll();
    res.send(orders);
  }
  async create(req: Request, res: Response): Promise<void> {
    const { user_id, order_status } = req.body;
    const dataObject: ICreateOrder = { user_id, order_status };
    const order = await Order.create(dataObject);
    res.status(201).send(order);
  }
  async addProduct(req: Request, res: Response): Promise<void> {
    const order_id: number = +req.params.id;
    const quantity:number = parseInt(req.body.quantity);
    const product_id:number = parseInt(req.body.product_id);
    const dataObject: IOrderProduct = { order_id, quantity , product_id };
    const result = await Order.addProduct(dataObject);
    res.status(201).send(result);
  }
}
export default new OrderController();
