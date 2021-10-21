import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { NgxSpinnerModule } from "ngx-spinner";  


@NgModule({
  declarations: [
    AppComponent,
    ViewCartComponent,
    ViewReceiptComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    HomeModule,
    CommonModule,
    AuthModule,
    NgxSpinnerModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
