import { Pipe, PipeTransform } from '@angular/core';
import { ProductCartRes } from '../model/product-cart';

@Pipe({
  name: 'subTotal'
})
export class SubTotalPipe implements PipeTransform {

  transform(value: ProductCartRes[], ...args: unknown[]): number {
    let sum: number =0;
    value.forEach(p=>{
      sum+=(p.product.precio*p.cantidad);
    });
  
    return sum;
  }

}
