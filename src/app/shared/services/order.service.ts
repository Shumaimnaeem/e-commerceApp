import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getAllOrders(){
    return this.http.get('https://61556a8093e3550017b089b8.mockapi.io/orders');
  }
  async getOrderById(id:number){
    const url = `https://61556a8093e3550017b089b8.mockapi.io/orders/${id}`;
    return await this.http.get(url).toPromise();
  }
}
