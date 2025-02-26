import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private subject = new Subject<any>();
  private genId: number = 1;

  constructor(private http: HttpClient) {}

  addProduct(item: { name: string; price: number; category: string }) {
    const productWithId = {
      ...item,
      id: this.genId,
    };
    this.subject.next(productWithId);
    this.genId++;
  }

  getProduct() {
    return this.subject.asObservable();
  }
}
