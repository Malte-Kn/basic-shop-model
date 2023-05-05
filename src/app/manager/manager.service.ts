import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'basic-shop-backend/src/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  constructor(private httpClient: HttpClient) { };
  title = "Euro Kiosk"
  logo = "./assets/Europe.jpg"
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
}
