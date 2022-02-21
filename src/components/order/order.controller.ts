import { Request, Response } from 'express';
import { ICreateOrder, IOrderSeralized, ORDER_STATUS } from './order.interfaces';
import Order from './order.model';
class OrderController {
  async getOrderById(req: Request, res: Response): Promise<void>{
    const order = await Order.findOrderById(+req.params.id);
    if(!order){
      res.status(400).send('Order Not Found');
    }else{
      res.send(order);
    }
  }
  async getOrders(req: Request, res: Response): Promise<void> {
    const orders = await Order.findAll();
    res.send(orders);
  }
  async create(req: Request, res: Response): Promise<void>{
    const {user_id, order_status} = req.body;
    const order: ICreateOrder = { user_id, order_status};
    const ret = await Order.create(order);
    res.status(201).send(ret);
  }
}
export default new OrderController();