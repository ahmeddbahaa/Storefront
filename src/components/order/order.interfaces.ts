export enum ORDER_STATUS {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}

export interface ICreateOrder {
  user_id: number;
  order_status: ORDER_STATUS;
}

export interface IOrder {
  id: number;
  user_id: number;
  order_status: ORDER_STATUS;
}

export interface IOrderSeralized {
  id: number;
  user_id: number;
  order_status: ORDER_STATUS;
}
export interface IOrderProduct {
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface IOrderProductSeralized {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}
