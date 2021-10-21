import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';


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
  onFileChange(event: any){
    console.log("Event: ", this.product.name);
    console.log("file: ", event.target.files[0]);
    this.product.image = event.target.files[0].name;
    console.log("image: ", this.product.image);
    
    
  }

}
