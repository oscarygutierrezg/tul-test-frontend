import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../model/product-type';

@Pipe({
  name: 'productTypeDesc'
})
export class ProductTypeDescPipe implements PipeTransform {

  transform(value: ProductType, ...args: unknown[]): string {
    switch (value) {
      case ProductType.WITHOUT_DISCOUNT:
        return 'Sin Descuento'
      case ProductType.WITH_DISCOUNT:
        return 'Con Descuento'
    }
  }

}