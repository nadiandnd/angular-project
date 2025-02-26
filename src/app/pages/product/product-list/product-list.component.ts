import { Component, inject, NgModule, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/models/typings';
import { Store } from '@ngxs/store';
import { ProductState } from '../../../store/product.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  productData$: Observable<IProduct[]> = inject(Store).select(
    ProductState.GetProductList
  );
}
