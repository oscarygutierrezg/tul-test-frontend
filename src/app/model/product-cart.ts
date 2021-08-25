import { Cart } from "./cart";
import { Product } from "./product";

export class ProductCartRes {
  cart: Cart;
  product: Product;
  cantidad: number;

  constructor() {
     this.cantidad = 0;
     this.product= new Product();
     this.cart= new Cart();
 }

}
export class ProductCartReq {
  cartId: string;
  productId: string;
  cantidad: number;

  constructor() {
     this.cantidad = 0;
     this.productId= '';
     this.cartId= '';
 }

}

