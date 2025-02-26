import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IProduct } from '../shared/models/typings';
import { Injectable } from '@angular/core';
import { ProductService } from '../services/product.service';
import { tap } from 'rxjs';
import {
  AddProduct,
  EditProduct,
  GetProductList,
  ResetProviderList,
} from './product.action';

export interface IProductStateModel {
  productList: IProduct[];
}

@State<IProductStateModel>({
  name: 'product',
  defaults: {
    productList: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

  @Selector()
  static GetProductList(state: IProductStateModel) {
    return state.productList;
  }

  @Action(GetProductList)
  GetProductList({ getState, setState }: StateContext<IProductStateModel>) {
    this.productService.getProduct().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          productList: result,
        });
      })
    );
  }

  @Action(AddProduct)
  AddProduct(
    { getState, setState }: StateContext<IProductStateModel>,
    { newProduct }: AddProduct
  ) {
    const state = getState();
    const updatedProductList = [...state.productList, newProduct];
    setState({
      ...state,
      productList: updatedProductList,
    });
  }

  @Action(EditProduct)
  EditProduct(
    { getState, patchState }: StateContext<IProductStateModel>,
    { product }: EditProduct
  ) {
    const state = getState();
    let productId = product.id;

    const PIndex = state.productList.findIndex(
      (pList) => productId == pList.id
    );

    if (PIndex > -1) {
      patchState({
        productList: state.productList.map((p, index) =>
          index === PIndex ? { ...p, ...product } : p
        ),
      });
    }
  }

  @Action(ResetProviderList)
  ResetProviderList({ patchState }: StateContext<IProductStateModel>) {
    patchState({ productList: [] });
  }
}
