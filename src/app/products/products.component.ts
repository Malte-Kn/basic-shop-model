import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'basic-shop-backend/src/products/products.service';
import { ManagerComponent } from '../manager/manager.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title: string = '';
  logo: string = '';
  kategorien: string[]= [];
  opentimes : any;
  subscription = new Subscription();
  public products$: Observable<any> | undefined;
  constructor(private productsService: ProductsService) { }


  //this.productsService.addProducts(testproduct).subscribe(product => this.products.push(product));

public getProducts(){
 this.products$ = this.productsService.getProducts();
}
changeKat(kategorie: string){

}
  ngOnInit(): void{
    this.getProducts();
    this.title = this.productsService.title;
    this.logo= this.productsService.logo;
    this.kategorien = this.productsService.kategorien;
    this.opentimes = this.productsService.opentimes
  }
}
