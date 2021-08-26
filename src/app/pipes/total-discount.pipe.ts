import { Pipe, PipeTransform } from '@angular/core';
import { ProductCartRes } from '../model/product-cart';

@Pipe({
  name: 'totalDiscount'
})
export class TotalDiscountPipe implements PipeTransform {

  transform(value: ProductCartRes[], ...args: unknown[]): number {
    let sum: number =0;
    value.forEach(p=>{
      const desc1 = p.product.porcentajeDescuento/100;
      sum+=(p.product.precio*desc1) *p.cantidad;
    });
  
    return sum;
  }

}
