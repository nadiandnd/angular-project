import { IProduct } from '../shared/models/typings';

export class GetProductList {
  static readonly type = '[Product] Get Product List';
}
export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public newProduct: IProduct) {}
}
export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public product: IProduct) {}
}
export class ResetProviderList {
  static readonly type = '[Product] Reset Provider List';
}
