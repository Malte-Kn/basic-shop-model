// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
import { ManagerService } from './manager.service';
import { Product } from 'basic-shop-backend/src/products/products.service';
import { Opentimes } from 'basic-shop-backend/src/products/products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})


export class ManagerComponent implements OnInit{
  url:any;
  logo:any;
  msg = "";
  sanitizer: any;
  static pw: string | undefined;
  opentimes: Opentimes = {monday:"9am - 5pm",tuesday:"9am - 5pm",wednesday:"9:00 - Do 1:00",thursday: "9:00 - 17:00",friday: "8:00 - 17:00",saturday: "9:00 - 17:00", sunday:"9:00 - 17:00"};
  opentimes$: Observable<any> | undefined;
  ManagerComponent: any;
  fileEvent(e:any){
    this.url = e.target.files[0];
  }
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file
  images: string[] | undefined;
  currImage: Observable<any> | any;
  public currimageUrl: any;
  image!: Blob | MediaSource;
  imageURL:SafeUrl | undefined;
  imageBlobUrl: any;
  products$: Observable<any> | undefined;
  product: Product | undefined;
  constructor(private readonly domSanitizer: DomSanitizer, private managerService: ManagerService) { }
  newProduct: Product = {
    name: '', price: 0, id: 1,
    imageUrl: new File([], '', { type: '' })
  };

  editProduct: Product = { name: '',  imageUrl: new File([], '', { type: '' }),price: 0, id : 0};


  title = this.managerService.title;
  files: { [key: string]: File; } ={"test":this.file};
  addProduct(product:Product) {
    this.products$ = this.managerService.addProducts(product);
  }

  editProductForm(product: {  name: string; imageUrl: File; price: number; id: number; }) {
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
    // this.products$.subscribe(
    //   products => {
    //     products.forEach(product => {

    //     })
    //   }
    // )
  }

  public getImage(name: string){
    this.managerService.getImage(name).subscribe(image =>{
      this.currimageUrl = this.domSanitizer.bypassSecurityTrustUrl(image);
      console.log(this.currimageUrl);

       let reader = new FileReader();
       reader.addEventListener("load", () => {
        this.imageBlobUrl = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
    });

      return this.imageBlobUrl;
  }
  getImages(){
    this.managerService.getImages().subscribe((data) => {
      this.images = data.images;
    });
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
    this.file = event.target.files[0];
    this.newProduct.imageUrl = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
      this.newProduct.imageUrl = this.url;
		}
}
getUrl(file:File){
  var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
			this.msg = "";
			return reader.result;
		}
}

public getTitle(){
  return this.title;
}
setopentimes(opentimes: Opentimes){
  console.log(opentimes);
  this.managerService.setOpentimes(opentimes);
}
public getopentimes(){
    this.managerService.getOpentimes().subscribe((data) => {
     this.opentimes;
   });
   console.log(this.opentimes);
  this.opentimes$ = this.managerService.getOpentimes();
  console.log(this.opentimes$);
}
  ngOnInit(): void {
    this.url="./assets/BildVorschau.png"
    this.logo= this.managerService.logo;
    this.getProducts();
    //this.ManagerComponent.pw = this.managerService.pw;
    this.getopentimes();


  }
}
function express() {
  throw new Error('Function not implemented.');
}


