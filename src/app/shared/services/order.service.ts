import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../interface/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getAllOrders():Observable<IOrder[]>{
    const orders: any = this.http.get('https://61556a8093e3550017b089b8.mockapi.io/orders');
    const allOrders : Observable<IOrder[]> = orders;
    return allOrders;
  }
  async getOrderById(id:number): Promise<IOrder>{
    const url = `https://61556a8093e3550017b089b8.mockapi.io/orders/${id}`;
    const order : any = await this.http.get(url).toPromise();
    const returnOrder: Promise<IOrder> = order;
    return returnOrder;
  }
}
