import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IOrder } from 'src/app/interface/order';
import { IProduct } from 'src/app/interface/product';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

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

export class ViewOrdersComponent implements OnInit {
  orders: IOrder[] = [];
  products : IProduct[] =[];
  productsByOrder: IProduct[] =[];
  orderWithProducts : IOrderAndProducts[] = [];
  constructor(private orderService : OrderService, private route: ActivatedRoute,
    private productService :ProductService, private router :Router) { }

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id: ", id);
    const allProducts:any = await this.productService.getProducts();
    this.productsByOrder = allProducts;
    
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
      this.getOrders();
    })
    
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
}
