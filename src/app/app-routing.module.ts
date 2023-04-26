import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component'
import { ManagerComponent } from './manager/manager.component'
import { ProductsModule } from './products/products.module';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductsModule],
  exports: [RouterModule, ProductsComponent]
})
export class AppRoutingModule { }
