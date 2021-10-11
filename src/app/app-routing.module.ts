import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewOrdersComponent } from './home/view-orders/view-orders.component';



const routes: Routes = [
  { path:'', component: SignupComponent},
  { path:'login', component: LoginComponent},
  { path: 'Home', loadChildren:()=> import('./home/home.module').then((m: any) => {return m.HomeModule}) },
  { path:'addProduct',component: AddProductComponent},
  { path: 'viewOrders/:id', loadChildren: () => import('./home/home.module').then((m:any) => {return m.HomeModule})},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
