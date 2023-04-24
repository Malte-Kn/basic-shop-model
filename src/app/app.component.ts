import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscribable } from 'rxjs/internal/types';
import { ProductsComponent } from './products/products.component'
import { ManagerComponent } from './manager/manager.component';

interface MenuItem {
  label: string;
  link: string;
}
interface Product{
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  title = 'Euro Kiosk';
  menuItems: MenuItem[] = [
    { label: 'Products', link: '/products' },
    { label: 'Manager', link: '/manager' },
  ];
  products$: any;
  constructor(private managerComponent: ManagerComponent) { }

  ngOnInit(): void{

  }

  getProducts() {
    this.products = this.managerComponent.getProducts();
}


}


