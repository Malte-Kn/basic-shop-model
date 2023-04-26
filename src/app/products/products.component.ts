import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';

interface Product{
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  subscription = new Subscription();
  testproduct = {name:"Phone" ,imgURL:"https://via.placeholder.com/150",price:44 }
  public products$: Observable<any> | undefined;
  constructor(private productsService: ProductsService) { }
  products: Product[] = [];
  title = 'Euro Kiosk';

  //this.productsService.addProducts(testproduct).subscribe(product => this.products.push(product));


 public addProducts(product: any){
    this.products$ = this.productsService.addProducts(this.testproduct);
  }
public getProducts(){
  this.products$ = this.productsService.getProducts();
}

  ngOnInit(): void{
    this.getProducts();
  }
}
