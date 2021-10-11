import { Component, OnInit , Input, NgModuleRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { IUser } from '../interface/user';
import { User } from '../models/user';
import { CartService } from '../services/cart.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interface/product';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { ICart } from '../interface/cart';
import { ViewReceiptComponent } from '../view-receipt/view-receipt.component';




@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  @Input() id :string ='';
  @Input() products: IProduct[] =[];
  title : string = 'Your Cart'
  user : IUser= new User;
  cartProducts : ICart[] = [] ;
  amount= 0;


  constructor(public activeModal: NgbActiveModal, private userService : UserService, 
    private route : ActivatedRoute, 
    private cartService: CartService,
    private modalService: NgbModal,
    private toasterService : ToastrService,
    private productService : ProductService) { 
  }

  ngOnInit(){
    this.calculateAmount();  
  }
  calculateAmount(){
    this.products.forEach((item:IProduct) => {
      console.log("Value: ", item);
      this.amount += +item.price;
      console.log("Amount: ", this.amount);
    });
  }
  
  async viewFinalReceipt(){
    await this.productService.addToCart({userId : this.id , products : this.products })
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ViewReceiptComponent, {backdrop: 'static'} );

    modalRef.componentInstance.cartProducts = this.products;
    modalRef.componentInstance.totalAmount = this.amount;
    modalRef.componentInstance.userId = this.id;

  }

  deleteProduct(product:IProduct){
    console.log("product: ", product);
    this.products = this.products.filter((cartProduct) =>{
      console.log("p:", cartProduct);
      return product.id !== cartProduct.id
    })
    this.amount = this.amount - product.price;
    console.log("Products: ", this.products);
  }
}
