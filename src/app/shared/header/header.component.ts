import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ViewCartComponent } from '../../view-cart/view-cart.component';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interface/product';
import { IUser } from '../interface/user';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/auth/AuthService/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : IUser = new User;
  productsList : IProduct[] =[]
  productsCount = 0;

  constructor(
    private modalService: NgbModal,
    private productService : ProductService,
    private router : Router,
    private userService : UserService,
    private authService : AuthService) { 
  } 

  async ngOnInit() {
    const loggedInUser:any = await this.authService.getUserDetail();
    this.user = loggedInUser;
    console.log("header User: ", this.user);
    
    this.productService.productsList.subscribe((products: any)=> {
      this.productsList = products;
      console.log("Products List: ", this.productsList);
    });
    this.productService.cartCount.subscribe((count)=>{
      this.productsCount = count;
      console.log("PC: ", this.productsCount);  
    })
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
