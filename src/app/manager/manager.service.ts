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

  getProducts(){
    return this.httpClient.get("http://localhost:3000/products");
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
  upload(image:File): Observable<Object>{
    return this.httpClient.post("http://localhost:3000/products/upload",image);
  }
}
