import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscribable } from 'rxjs/internal/types';
import { ProductsComponent } from './products/products.component'
import { ManagerComponent } from './manager/manager.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop';
}


