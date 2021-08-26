import { Component, Input, OnInit } from '@angular/core';
import { ProductCartRes } from 'src/app/model/product-cart';

@Component({
  selector: 'app-product-cart-summary',
  templateUrl: './product-cart-summary.component.html',
  styleUrls: ['./product-cart-summary.component.css']
})
export class ProductCartSummaryComponent implements OnInit {
  @Input() products: ProductCartRes[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
