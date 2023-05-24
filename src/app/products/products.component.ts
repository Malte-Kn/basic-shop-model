import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { Opentimes, Product } from 'basic-shop-backend/src/products/products.service';
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
  opentimes : Opentimes ={monday:"9am - 5pm",tuesday:"9am - 15pm",wednesday:"9:00 - Do 1:00",thursday: "9:00 - 17:00",friday: "8:00 - 17:00",saturday: "9:00 - 17:00", sunday:"9:00 - 17:00"};
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
    this.productsService.title.subscribe((response) =>{
      this.title = response.title;
    });
    this.productsService.opentimes.subscribe((res: Opentimes) =>{
      this.opentimes = res;
    });
    this.logo= this.productsService.logo;
    this.kategorien = this.productsService.kategorien;
    this.opentimes = this.productsService.opentimes
  }
}
