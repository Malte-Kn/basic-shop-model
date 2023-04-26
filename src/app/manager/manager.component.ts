// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})


export class ManagerComponent implements OnInit{

  public products = [
    { id: 1, name: 'Product 1', price: 10, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30, imageUrl: 'https://via.placeholder.com/150' },
  ];

  products$: Observable<any> | undefined;
  newProduct = { name: '', price: 0, imageUrl: '' };
  editProduct = { id: 0, name: '', price: 0, imageUrl: '' };
  editProductId = 0;

  addProduct() {
    const id = Math.max(...this.products.map(product => product.id)) + 1;
    this.products.push({ id, ...this.newProduct });
    this.newProduct = { name: '', price: 0, imageUrl: '' };
  }

  editProductForm(product: { id: number; name: string; price: number; imageUrl: string; }) {
    this.editProduct = { ...product };
    this.editProductId = product.id;
  }

  edit_Product() {
    const productIndex = this.products.findIndex(product => product.id == this.editProductId);
    this.products[productIndex] = this.editProduct;
    this.editProduct = { id: 0, name: '', price: 0, imageUrl: '' };
    this.editProductId = 0;
  }

  deleteProduct(productId: number) {
    const productIndex = this.products.findIndex(product => product.id == productId);
    this.products.splice(productIndex, 1);
  }
  public getProducts(): { id: number; name: string; price: number; imageUrl: string; }[]{
    return this.products;
  }
  ngOnInit(): void {

  }
}
