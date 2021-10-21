import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AuthGuard } from '../auth/AuthService/auth.guard';
import { HeaderComponent } from '../shared/header/header.component';
import { AllProductsComponent } from '../product/all-products/all-products.component';
import { NgxSpinnerModule } from "ngx-spinner";  


const routes : Routes = [
    { path: 'viewOrders/:id', component: ViewOrdersComponent, },
    { path:'home', component: HomeComponent, canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [
    HomeComponent,
    ViewOrdersComponent,
    HeaderComponent, 
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [HomeComponent,ViewOrdersComponent],
})
export class HomeModule { }
