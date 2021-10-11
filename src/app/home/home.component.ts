import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { IProduct } from '../interface/product';
import { ViewCartComponent } from '../view-cart/view-cart.component';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products : IProduct[]= [];
  user : any
  productsCount = 0;
  count =0;
  clicked = false;
  productsList : IProduct[] =[];

  constructor(private productService : ProductService, private route : ActivatedRoute , 
    private userService : UserService, private modalService: NgbModal,
    private toasterService: ToastrService,
    private router : Router) { 
    this.user = new User;
  } 

  async ngOnInit(){
   const userId = localStorage.getItem('User')
   this.user= await this.userService.getUser(userId);
   console.log("User: ", this.user);
   
   const products:any = await this.productService.getProducts();
   this.products = products;
   console.log("products: ", this.products);
  }

  addToCart(product: IProduct){
      product.quantity = 0;
      this.productsList.push(product);
      console.log("Product: ", product);
      this.count+=1;
      this.productService.setLatestValue(this.count);
      this.productService.cartCount.subscribe((count)=>{
        this.productsCount = count;
      })
      console.log("productsCount", this.productsCount);
      
      this.toasterService.success('Product has been added to Cart')
  }

  viewCart(){
    const modalRef = this.modalService.open(ViewCartComponent, {backdrop: 'static'} );
    modalRef.componentInstance.id = this.user.id;
    modalRef.componentInstance.products = this.productsList;
  }
  logout(){
    localStorage.removeItem('User');
    this.router.navigate(['/']);
  }

}
