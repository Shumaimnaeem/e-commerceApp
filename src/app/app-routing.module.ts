import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
const routes: Routes = [
  { path:'', loadChildren:()=> import('./auth/auth.module').then((m: any) => {return m.AuthModule})},
  { path:'signup', loadChildren:()=> import('./auth/auth.module').then((m: any) => {return m.AuthModule})},
  { path: 'home', loadChildren:()=> import('./home/home.module').then((m: any) => {return m.HomeModule}) },
  { path:'addProduct',loadChildren:()=> import('./product/product.module').then((m: any) => {return m.ProductModule})},
  { path: 'viewOrders/:id', loadChildren: () => import('./home/home.module').then((m:any) => {return m.HomeModule})},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule, AuthModule, ProductModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
