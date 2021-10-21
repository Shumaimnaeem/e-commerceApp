import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { IProduct } from '../../shared/interface/product';
import { ViewCartComponent } from '../../view-cart/view-cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
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
   if(userId){
    this.user= await this.userService.getUser(+userId);
    console.log("User: ", this.user);
   }
   const products:any = await this.productService.getProducts();
   this.products = products;

   console.log("products: ", this.products);
  }

  addToCart(product: IProduct){
      product.quantity = 0;
      this.productService.addProductsToCart(product);
      this.productsList.push(product);
      console.log("Products: ", product);
      this.count++;
      this.productService.setLatestValue(this.count);
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
  getUrl(product:IProduct){
    // console.log("Url", '/assets/'+product.id+'/'+product.image);
    return '/assets/'+product.id+'/'+product.image;
  }

}
