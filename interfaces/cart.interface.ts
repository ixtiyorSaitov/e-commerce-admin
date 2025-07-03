import { IProduct } from "./product.interface";

export interface ICart {
  _id: string;
  productId: string;
  quantity: number;
}

export interface ICartItem {
  _id: string;
  product: IProduct;
  quantity: number;
}
