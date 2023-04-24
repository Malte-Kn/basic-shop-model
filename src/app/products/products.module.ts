import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {HttpClientModule} from "@angular/common/http"


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
