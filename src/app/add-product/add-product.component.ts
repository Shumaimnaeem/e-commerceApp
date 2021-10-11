import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 product : Product = new Product;
 categories : string[] = ['Mobile', 'Laptop', 'Mobile Accessories']
 submitted : boolean = false;
  constructor(private productService : ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Product: ", this.product);
    this.productService.addProduct(this.product);
    this.submitted = true;
    this.router.navigate(['./home'])
  }

}
