import { Pipe, PipeTransform } from '@angular/core';
import { ProductCartRes } from '../model/product-cart';

@Pipe({
  name: 'productsQty'
})
export class ProductsQtyPipe implements PipeTransform {

  transform(value: ProductCartRes[], ...args: unknown[]): number {
    let sum: number =0;
    value.forEach(p=>{
      sum+=p.cantidad;
    });
  
    return sum;
  }

}
