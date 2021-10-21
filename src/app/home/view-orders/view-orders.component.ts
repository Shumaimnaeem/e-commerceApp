import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../../shared/interface/product';
import { IOrder } from '../../shared/interface/order';
import { OrderService } from '../../shared/services/order.service';
import { ProductService } from '../../shared/services/product.service';
import { AuthService } from 'src/app/auth/AuthService/auth.service';
import { NgxSpinnerService } from "ngx-spinner";  

interface IOrderAndProducts {
  order: string,
  products : IProduct[]
  amount : number,
  date : Date
}

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})

export class ViewOrdersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  products : IProduct[] =[];
  productsByOrder: IProduct[] =[];
  orderWithProducts : IOrderAndProducts[] = [];
  subscriptions: Subscription[] = [];
  loggedInUser: Boolean = true;
  constructor(private orderService : OrderService, private route: ActivatedRoute,
    private productService :ProductService, private router :Router, private authService : AuthService,
    private SpinnerService: NgxSpinnerService) { }

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id: ", id);
    const CurrentUser = await this.authService.getUserDetail();
    console.log("id: ", CurrentUser.id );
    const allProducts:any = await this.productService.getProducts();
    this.productsByOrder = allProducts;
    this.subscriptions.push(
      this.orderService.getAllOrders().pipe(
        map((orders:any)=>{
          return orders.filter((order : IOrder) => {
              return order.userId == id
          })
        })
      ).
      subscribe((orders:any) => {
        this.orders = orders;
        console.log("All Orders: ", this.orders);
        if(id === CurrentUser.id ){
          this.getOrders();
        }
        else{
          this.loggedInUser = false;
        }
      })
    )
    
  }

  async getOrders(){
    const allOrders = this.orders.map(async order => {
      const orderAndProducts: IOrderAndProducts | any  = {};
      orderAndProducts.order = order.id;
      orderAndProducts.amount = order.totalAmount; 
      orderAndProducts.date = order.createdAt     
      const products = await this.getProductsByOrderId(order.productIds);
      console.log("prod: ", products);
      orderAndProducts.products = products;
      return orderAndProducts;
    });   

    this.orderWithProducts = await Promise.all(allOrders);
    console.log("Order And Products: ", this.orderWithProducts);
    
  }

  async getProductsByOrderId(ids:any){
    console.log("ids: ", ids);
    console.log("productsByOrder: ", this.productsByOrder);
    return this.productsByOrder.filter((product:IProduct)=>{
      return ids.flat(1).includes(product.id);
    })
  }
  ngOnDestroy(){
    if(!!this.subscriptions){
      while(this.subscriptions.length > 0){
        this.subscriptions.pop();
      }
    }
  }

}
