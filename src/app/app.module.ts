import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ManagerComponent } from './manager/manager.component';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { ProductsComponent } from './products/products.component';
//import { ProductsService } from './products.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'manager', component: ManagerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ProductsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
