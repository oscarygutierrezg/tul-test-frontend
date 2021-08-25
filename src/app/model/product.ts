import { ProductType } from "./product-type";

export class Product {
  id: string;
  nombre: string;
  sku: string;
  descripcion: string;
  precio: number;
  porcentajeDescuento: number;
  tipoProducto: ProductType;

  constructor() {
    this.id = '';
    this.nombre = '';
    this.sku = '';
    this.descripcion = '';
    this.porcentajeDescuento = 0;   
     this.precio = 0;
     this.tipoProducto=ProductType.NODE
 }

}
