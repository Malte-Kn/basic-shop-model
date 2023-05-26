import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'basic-shop-backend/src/products/products.service';
import { Opentimes } from 'basic-shop-backend/src/products/products.service';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  constructor(private httpClient: HttpClient) { };
  title: string = "";
  info = "Bester Kiosk in Stadt"
  logo = "./assets/Europe.jpg";
  kategorien = ["Tabak", "Trinken", "Suesses", "Nahrungsmittel", "Anderes"];
  pw = this.httpClient.get("http://localhost:3000/pw");
  opentimes: any ;
  getProducts(){
    return this.httpClient.get("http://localhost:3000/products");
  }
  getImage(name:string): Observable<any>{
    return this.httpClient.get("http://localhost:3000/products/"+name, {responseType: "blob"});
  }
  getImages(){
    return this.httpClient.get<{images: string[]}>("http://localhost:3000/products/images");
  }
  addProducts(product: Product): Observable <any>{
    return this.httpClient.post("http://localhost:3000/products", product);
  }
  deleteProduct(id: number){
    return this.httpClient.delete("http://localhost:3000/products/"+id);
  }
  editProducts(product: Product){
    return this.httpClient.put("http://localhost:3000/products/", product);
  }
  upload(image:File, name:string){
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', image, name);

    return this.httpClient.post("http://localhost:3000/products/upload",formData);

  }
  setOpentimes(opentimes:Opentimes){
    //console.log(opentimes);
    return this.httpClient.post("http://localhost:3000/products/open",{opentimes}).subscribe(
      (response) => {
        console.log('Set info successful:', response);
        // Handle the response data
      },
      (error) => {
        console.error('Error setting info:', error);
        // Handle the error
      }
    );
  }
  getOpentimes(){
    return this.httpClient.get<Opentimes>("http://localhost:3000/products/open");
    // .subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.opentimes =  response;
    //   },
    //   (error) => {
    //     // Handle any errors here
    //     console.error(error);
    //   }
    // );
    //return this.httpClient.get("http://localhost:3000/products/open");//<{opentimes: string[]}>
    return this.opentimes;
  }
  setTitle(title:{title:string}){
    console.log(title)
    return this.httpClient.post("http://localhost:3000/products/title", {title}).subscribe(
      (response) => {
        console.log('Set info successful:', response);
        // Handle the response data
      },
      (error) => {
        console.error('Error setting info:', error);
        // Handle the error
      }
    );
  }
  getTitle(){
    return this.httpClient.get<any>("http://localhost:3000/products/title")


   }
   getInfo(){
    return this.httpClient.get<any>("http://localhost:3000/products/info")
   }
   setInfo(infos:[{info:string},{location:string}]){
    console.log(infos)
    return this.httpClient.post("http://localhost:3000/products/info", infos).subscribe(
      (response) => {
        console.log('Set info successful:', response);
        // Handle the response data
      },
      (error) => {
        console.error('Error setting info:', error);
        // Handle the error
      }
    );
  }
}
