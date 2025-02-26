import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';

import { Store } from '@ngxs/store';
import { AddProduct } from '../../../store/product.action';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  public addProductForm!: FormGroup;
  public categories: string[] = [
    'Electronics',
    'Clothing',
    'Home Appliances',
    'Books',
  ];
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      category: [''],
      attribute: this.fb.array([this.fb.control('')]),
    });
  }

  get attribute() {
    return this.addProductForm.get('attribute') as FormArray;
  }

  addAttribute() {
    this.attribute.push(this.fb.control(''));
  }

  removeAttribute(index: number) {
    this.attribute.removeAt(index);
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      this.store.dispatch(new AddProduct(this.addProductForm.value));
    }
  }
}
