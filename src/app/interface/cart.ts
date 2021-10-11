import { IProduct } from "../interface/product";
export interface ICart{
    id: string;
    userId : string;
    products : IProduct
}