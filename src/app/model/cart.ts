import { CartStatusType } from "./cart-status-type";
import { ProductType } from "./product-type";

export class Cart {
  id: string;
  total: number;
  descuento: number;
  estado: CartStatusType;
  
  constructor() {
    this.id = '';
    this.total = 0;   
     this.descuento = 0;
     this.estado=CartStatusType.CREATED
 }

}
