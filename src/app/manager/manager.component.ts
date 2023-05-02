// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
import { ManagerService } from './manager.service';
import { Product } from 'basic-shop-backend/src/products/products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


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
  url:any;
  msg = "";
  sanitizer: any;
  fileEvent(e:any){
    this.url = e.target.files[0];
  }

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file
  currImage: Observable<any> | any;
  public currimageUrl: any;
  image!: Blob | MediaSource;
  imageURL:SafeUrl | undefined;
  imageBlobUrl: string | null = null;
  products$: Observable<any> | undefined;
  constructor(private readonly domSanitizer: DomSanitizer, private managerService: ManagerService) { }
  newProduct: Product = { name: '',  imageUrl: '',price: 0, id : 1};

  editProduct: Product = { name: '',  imageUrl: '',price: 0, id : 0};

  testProduct: Producttest = { name: '',  imageFile: <any> File,price: 0, id : 0};

  files: { [key: string]: File; } ={"test":this.file};
  addProduct(product:Product) {
    this.products$ = this.managerService.addProducts(product);
    this.upload(product.name);
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

  public getImage(name: string){
    this.managerService.getImage(name).subscribe(image =>{
      this.currimageUrl = this.domSanitizer.bypassSecurityTrustUrl(image);
      this.files[name] =this.currimageUrl
      console.log(this.currimageUrl);

       let reader = new FileReader();
       reader.addEventListener("load", () => {
        this.imageBlobUrl = reader.result as string;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
    });

      return this.imageBlobUrl;
  }
  getImages(){

  }
  upload(name:string){
    this.loading = !this.loading;
    console.log(this.file);
    this.managerService.upload(this.file, name).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {
              this.shortLink = event.link;
              this.loading = false;
          }
      }
  );
}
  onChange(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
    var reader = new FileReader();
    this.file = event.target.files[0];		reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
}



  ngOnInit(): void {
    this.getImage("Tim");
    this.getProducts();

  }
}
