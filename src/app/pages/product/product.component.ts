import { Component } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-product',
  imports: [ProductFormComponent, ProductListComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
