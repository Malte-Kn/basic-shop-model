import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  subscription = new Subscription();
  products$: Observable<any> | undefined;
  testproduct = {name:"Phone" ,imgURL:"https://via.placeholder.com/150",price:44 }
  constructor(private productsService: ProductsService) { }


  //this.productsService.addProducts(testproduct).subscribe(product => this.products.push(product));


 public addProducts(product: any){
    this.products$ = this.productsService.addProducts(this.testproduct);
  }
  ngOnInit(): void{
    this.products$ = this.productsService.getProducts();
  }
}
