import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ViewCartComponent,
    ViewReceiptComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    ViewCartComponent,
    ViewReceiptComponent
  ]

})
export class CartModule { }
