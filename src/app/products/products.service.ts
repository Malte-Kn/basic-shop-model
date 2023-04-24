import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({

  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  public getProducts(){
    return this.httpClient.get("http://localhost:3000/products");
  }
  addProducts(product: any): Observable <any>{
    return this.httpClient.put("http://localhost:3000/products", product);
  }
}
