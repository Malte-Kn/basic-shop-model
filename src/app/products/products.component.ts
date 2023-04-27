import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'basic-shop-backend/src/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  subscription = new Subscription();
  public products$: Observable<any> | undefined;
  constructor(private productsService: ProductsService) { }
  title = 'Euro Kiosk';

  //this.productsService.addProducts(testproduct).subscribe(product => this.products.push(product));

public getProducts(){
  this.products$ = this.productsService.getProducts();
}

  ngOnInit(): void{
    this.getProducts();
  }
}
