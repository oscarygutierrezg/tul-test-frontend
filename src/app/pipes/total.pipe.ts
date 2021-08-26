import { Pipe, PipeTransform } from '@angular/core';
import { ProductCartRes } from '../model/product-cart';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(value: ProductCartRes[], ...args: unknown[]): number {
    let desc: number =0;
    value.forEach(p=>{
      const desc1 = p.product.porcentajeDescuento/100;
      desc+=(p.product.precio*desc1) *p.cantidad;
    });
    let sum: number =0;
    value.forEach(p=>{
      sum+=(p.product.precio*p.cantidad);
    });
  
    return sum-desc;
  }

}
