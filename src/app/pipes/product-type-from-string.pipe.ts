import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../model/product-type';

@Pipe({
  name: 'productTypeFromString'
})
export class ProductTypeFromStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    switch (value) {
      case 'WITHOUT_DISCOUNT':
        return ProductType.WITHOUT_DISCOUNT
      case 'WITH_DISCOUNT':
        return ProductType.WITH_DISCOUNT
    }
  }

}