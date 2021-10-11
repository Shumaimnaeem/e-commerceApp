import { Component, OnInit , Input } from '@angular/core';
import { IUser } from '../interface/user';
import { User } from '../models/user';
import { ICart } from '../interface/cart';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interface/product';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  @Input() cartProducts :IProduct[] = [];
  @Input() totalAmount : number = 0;
  @Input() userId :string ='';

  title : string = 'Your Final Receipt'
  user : IUser= new User;
  cart :ICart[] =[];
  cartLength = 0;


  constructor(public activeModal: NgbActiveModal, private userService : UserService, 
    private route : ActivatedRoute, 
    private cartService: CartService,
    private modalService: NgbModal,
    private toasterService : ToastrService,
    private productService : ProductService) { 
  }

  async ngOnInit(){
    const cart:ICart[] = await this.getCartItems()
    this.cart = cart;
    this.cartLength = this.cart.length-1;
    console.log("cart length: ", this.cartLength);
    
  }
  
  async placeOrder(){
    const productIds:any = [];
    this.cartProducts.forEach((item:IProduct) => {
      console.log("Value: ", item);
      productIds.push(item.id);
    });
    this.toasterService.success('Order Placed Successfully')
    this.cartService.placeOrder({userId: this.userId , productIds : productIds, totalAmount: this.totalAmount});
    this.productService.setLatestValue(0);
    this.modalService.dismissAll();
    await this.deleteCart()

  }
  async deleteCart(){
    await this.cartService.deleteCart(this.cart[this.cartLength].id);
  }
  async getCartItems(){
    const cartItems:any = await this.cartService.getCartItems();
    console.log("cartItems: ", cartItems);  
    return cartItems.filter((item:ICart)=>{
          return item.userId == this.userId
    });
  }

}
