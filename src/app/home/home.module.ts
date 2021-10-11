import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
const routes : Routes = [
    { path: 'viewOrders/:id', component: ViewOrdersComponent},
    { path:'home', component: HomeComponent},
];

@NgModule({
  declarations: [
    HomeComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [HomeComponent,ViewOrdersComponent],
})
export class HomeModule { }
