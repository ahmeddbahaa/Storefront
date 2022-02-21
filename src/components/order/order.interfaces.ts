export enum ORDER_STATUS {
    ACTIVE = 'active',
    COMPLETE ='complete'
}

export interface ICreateOrder {
  user_id: number,
  order_status: ORDER_STATUS
}

export interface IOrder{
    id:number,
    user_id: number,
    order_status: ORDER_STATUS
}

export interface IOrderSeralized{
    id: number,
    user_id: number,
    order_status: ORDER_STATUS
}