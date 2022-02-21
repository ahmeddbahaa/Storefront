export interface ICreateProduct{
    name:string,
    price:number,
    category_id?: (number| null)
};

export interface IProduct{
    id:number,
    name:string,
    price:number,
    category_id?:(number| null)
};

export interface IProductSerialized{
    id:number,
    name:string,
    price:number,
    category_id?:(number| null)
}
