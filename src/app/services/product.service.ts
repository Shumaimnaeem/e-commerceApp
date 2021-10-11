import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';    


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productCount = new BehaviorSubject<any>(0);    
  public cartCount = this.productCount.asObservable();  


  constructor(private http : HttpClient) { }

  async addProduct(p: any){
    console.log("P service: ", p);
    
    return await this.http.post('https://61556a8093e3550017b089b8.mockapi.io/product', p).toPromise();
  }

  async getProducts(){
    return await this.http.get('https://61556a8093e3550017b089b8.mockapi.io/product').toPromise();
  }
  async getProductById(id:number){
    const url = `https://61556a8093e3550017b089b8.mockapi.io/product/${id}`;
    return await this.http.get(url).toPromise();
  }
  async addToCart(productAndUserId : any){
    console.log("productAndUserId: ", productAndUserId);
    return await this.http.post('https://61556a8093e3550017b089b8.mockapi.io/cart', productAndUserId).toPromise();
  }
  setLatestValue(value : number) {   
    console.log("Val: ", value);
    this.productCount.next(value);   
  }

    

}
