// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
import { ManagerService } from './manager.service';
import { Product } from 'basic-shop-backend/src/products/products.service';


export interface Producttest {
  name: string;
  imageFile: File;
  price: number;
  id:number;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})


export class ManagerComponent implements OnInit{
  filedata:any;
  fileEvent(e:any){
    this.filedata = e.target.files[0];
  }

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file
  currImage: Observable<any> | any;
  currimageUrl: string = '';
  products$: Observable<any> | undefined;
  constructor(private managerService: ManagerService) { }
  newProduct: Product = { name: '',  imageUrl: '',price: 0, id : 0};

  editProduct: Product = { name: '',  imageUrl: '',price: 0, id : 0};

  testProduct: Producttest = { name: '',  imageFile: <any> File,price: 0, id : 0};

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
    console.log(this.products$);
  }
  public getImage(name: string){
    this.managerService.getImage(name).subscribe((data) => {
      this.currImage = data;
      console.log(this.currImage);
    });
    //this.currImage = this.managerService.getImage(name);
  }
  upload(){
    this.loading = !this.loading;
    console.log(this.file);
    this.managerService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {
              this.shortLink = event.link;
              this.loading = false;
          }
      }
  );
}
  onChange(event: any) {
    this.file = event.target.files[0];
}


  ngOnInit(): void {
    this.getImage('0.webp');
    this.getProducts();

  }
}
