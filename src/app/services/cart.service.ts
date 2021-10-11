import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  async getCartItems(){
    return await this.http.get('https://61556a8093e3550017b089b8.mockapi.io/cart').toPromise();
  }

  async placeOrder(o:any){
    return await this.http.post('https://61556a8093e3550017b089b8.mockapi.io/orders', o).toPromise();
  }
  async deleteCart(id:string){
    console.log("Id: ", id);
    const url = `https://61556a8093e3550017b089b8.mockapi.io/cart/${id}`;
    return await this.http.delete(url).toPromise();
  }
}
