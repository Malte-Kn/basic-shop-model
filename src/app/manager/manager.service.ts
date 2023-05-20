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
    console.log(opentimes);
    return this.httpClient.post("http://localhost:3000/products/open",opentimes);
  }
  getOpentimes(){
    this.httpClient.get<any>("http://localhost:3000/products/open").subscribe(
      (response) => {
        console.log(response);
        this.opentimes =  response;
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
    //return this.httpClient.get("http://localhost:3000/products/open");//<{opentimes: string[]}>
    return this.opentimes;
  }
  SetInfo(title:string, info:string){
    //this.title = title;
    this.info = info;
  }
  getTitle(){
    this.httpClient.get<any>("http://localhost:3000/products/title").subscribe(
      (response) => {
        console.log(response);
        this.title = response.title;
        console.log(this.title);
        return this.title;

      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
    console.log(this.title +"2");
    return this.title;

  }
}
