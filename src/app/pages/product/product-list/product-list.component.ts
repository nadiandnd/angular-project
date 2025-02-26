import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  productData: any[] = [];

  ngOnInit(): void {
    this.productService
      .getProduct()
      .subscribe((data) => this.productData.push(data));
  }
}
