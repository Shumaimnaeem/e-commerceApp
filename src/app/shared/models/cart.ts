import { Product } from "./product";
import { IProduct } from "../interface/product";
export class Cart{
    id: string ='';
    userId : string = '';
    products : IProduct = new Product();
}