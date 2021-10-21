import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { IProduct } from '../shared/interface/product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
}
