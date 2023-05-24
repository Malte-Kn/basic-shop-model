// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
import { ManagerService } from './manager.service';
import { Product } from 'basic-shop-backend/src/products/products.service';
import { Opentimes } from 'basic-shop-backend/src/products/products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})


export class ManagerComponent implements OnInit{
  url:any="./assets/BildVorschau.png";
  editurl:any ="./assets/BildVorschau.png";
  logo:any;
  msg = "";
  sanitizer: any;
  static pw: string | undefined;
  opentimes: Opentimes = {monday:"9am - 5pm",tuesday:"9am - 15pm",wednesday:"9:00 - Do 1:00",thursday: "9:00 - 17:00",friday: "8:00 - 17:00",saturday: "9:00 - 17:00", sunday:"9:00 - 17:00"};
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
  constructor(private readonly domSanitizer: DomSanitizer, private managerService: ManagerService, private location: Location) { }
  newProduct: Product = {
    name: 'Name', price: 999, id: 1,
    imageUrl: new File([], '', { type: '' })
  };

  editProduct: Product = { name: 'Name',  imageUrl: new File([], '', { type: '' }),price: 999, id : 0};


  title = "";
  info = this.managerService.info;
  files: { [key: string]: File; } ={"test":this.file};
  addProduct(product:Product) {
    this.products$ = this.managerService.addProducts(product);
  }

  editProductForm(product: {  name: string; imageUrl: File; price: number; id: number; }) {
    this.editProduct = { ...product };
    this.editurl = product.imageUrl;
  }

  edit_Product(product:Product) {
    this.products$ = this.managerService.editProducts(product);
  }

  deleteProduct(id:number) {
    this.products$ = this.managerService.deleteProduct(id);
  }

  public getProducts(){
    this.products$ = this.managerService.getProducts();

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
onChangeedit(event: any) {
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
    this.editurl = reader.result;
    this.editProduct.imageUrl= this.editurl;
  }
  console.log(this.title);
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
  //   this.managerService.getOpentimes().subscribe((data) => {
  //    this.opentimes;
  //  });
   console.log(this.opentimes);
  this.opentimes = this.managerService.opentimes;
  console.log(this.opentimes);
}

changeInfo(titl:string, info:string){
  this.managerService.setInfo({title: titl});
  this.managerService.getTitle().subscribe((response) =>{
    this.title = response.title;
  });
  window.location.reload();
}
 cropImage() {
  // Get the uploaded file
  const fileInput = document.getElementById('image-upload') as HTMLInputElement;
  const file = fileInput.files?.[0];

  // Check if a file is selected
  if (file) {
    // Create a FileReader object
    const reader = new FileReader();

    // Set the onload event handler
    reader.onload = function(e) {
      // Set the uploaded image as the background of the preview div
      const imagePreview = document.getElementById('image-preview');
      if (imagePreview) {
        imagePreview.style.backgroundImage = `url(${e.target?.result})`;
      }
    }

    // Read the uploaded file as a data URL
    reader.readAsDataURL(file);
  }
}


  async ngOnInit(): Promise<void> {
    this.logo= this.managerService.logo;
    this.getProducts();
    //this.ManagerComponent.pw = this.managerService.pw;
    await this.managerService.getOpentimes().subscribe((res: Opentimes) =>{
      this.opentimes = res;
    });
    this.managerService.getTitle().subscribe((response) =>{
      this.title = response.title;
    });

  }
}
function express() {
  throw new Error('Function not implemented.');
}


