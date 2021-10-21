import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';    
import { IProduct } from '../interface/product';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productCount = new BehaviorSubject<any>(0);    
  public cartCount = this.productCount.asObservable();  
  public productsArray = new Subject<IProduct[]>();    
  public productsList = this.productsArray.asObservable();  
  products : IProduct[] =[];

  constructor(private http : HttpClient) { }

  async addProduct(p: any){
    console.log("P service: ", p);
    
    return await this.http.post('https://61556a8093e3550017b089b8.mockapi.io/product', p).toPromise();
  }

  async getProducts():Promise<IProduct[]>{
    const products: any = await this.http.get('https://61556a8093e3550017b089b8.mockapi.io/product').toPromise();
    const allProducts : IProduct[] = products;
    return allProducts;
  }
  async getProductById(id:number): Promise<IProduct>{
    const url = `https://61556a8093e3550017b089b8.mockapi.io/product/${id}`;
    const product: any = await this.http.get(url).toPromise();
    const productById : IProduct = product;
    return productById;
  }
  async addToCart(productAndUserId : any){
    console.log("productAndUserId: ", productAndUserId);
    return await this.http.post('https://61556a8093e3550017b089b8.mockapi.io/cart', productAndUserId).toPromise();
  }
  setLatestValue(value : number) {   
    console.log("Val: ", value);
    this.productCount.next(value);   
  }
  addProductsToCart(product : Product){
    this.products.push(product);
    this.productsArray.next(this.products);
  }
  setProducts(){
    console.log("setProducts");
    this.products= [];
    this.productsArray.next(this.products);
    console.log("productsArray: ", this.productsArray);
    
  }  

}
