// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
import { ManagerService } from './manager.service';
import { Product } from 'basic-shop-backend/src/products/products.service';



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})


export class ManagerComponent implements OnInit{
  currImage!: File;
  currimageUrl: string = '';
  products$: Observable<any> | undefined;
  constructor(private managerService: ManagerService) { }
  newProduct: Product = { name: '',  imageUrl: '',price: 0, id : 0};

  editProduct: Product = { name: '',  imageUrl: '',price: 0, id : 0};


  addProduct(product:Product) {
    this.products$ = this.managerService.addProducts(product);
  }

  editProductForm(product: {  name: string; imageUrl: string; price: number; id: number; }) {
    this.editProduct = { ...product };
  }

  edit_Product(product:Product) {
    this.products$ = this.managerService.editProducts(product);
  }

  deleteProduct(id:number) {
    this.products$ = this.managerService.deleteProduct(id);
  }
  public getProducts(){
    this.products$ = this.managerService.getProducts();
  }
  upload(event: any){
    console.log(event);
    this.currImage = event.addedFiles;
    //this.newProduct.imageUrl = this.managerService.upload(this.currImage);
  }
  ngOnInit(): void {
    this.getProducts();
  }
}
