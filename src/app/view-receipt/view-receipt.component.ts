import { Component, OnInit , Input } from '@angular/core';
import { IUser } from '../shared/interface/user';
import { User } from '../shared/models/user';
import { ICart } from '../shared/interface/cart';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interface/product';
import { NgxSpinnerService } from "ngx-spinner";  


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
    private router : Router, 
    private cartService: CartService,
    private modalService: NgbModal,
    private toasterService : ToastrService,
    private productService : ProductService,
    private SpinnerService: NgxSpinnerService) { 
  }

  async ngOnInit(){
    // this.SpinnerService.show();
    this.cart = await this.getCartItems();
    // this.SpinnerService.hide();
    this.cartLength = this.cart.length-1;
    
  }
  
  async placeOrder(){
    const productIds:any= [];
    this.cartProducts.forEach((item:IProduct) => {
      console.log("Value: ", item);
      productIds.push(item.id);
    });
    this.toasterService.success('Order Placed Successfully')
    // this.SpinnerService.show();
    this.cartService.placeOrder({userId: this.userId , productIds : productIds, totalAmount: this.totalAmount});
    this.productService.setLatestValue(0);
    this.modalService.dismissAll();
    this.productService.setProducts();
    await this.deleteCart();
    this.router.navigate([`/viewOrders/${this.userId}`])
    // this.SpinnerService.hide();



  }
  async deleteCart(){
    await this.cartService.deleteCart(this.cart[this.cartLength].id);
  }
  async getCartItems(){
    const cartItems:ICart[] = await this.cartService.getCartItems();
    console.log("cartItems: ", cartItems);  
    return cartItems.filter((item:ICart)=>{
          return item.userId == this.userId
    });
  }

}
