import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ManagerComponent } from './manager/manager.component';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { ProductsComponent } from './products/products.component';
//import { ProductsService } from './products.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ProductsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'manage', component: ManagerComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
