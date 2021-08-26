import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { ProductCartRes } from 'src/app/model/product-cart';

@Component({
  selector: 'app-end-cart',
  templateUrl: './end-cart.component.html',
  styleUrls: ['./end-cart.component.css']
})
export class EndCartComponent implements OnInit,  OnDestroy{
  productsCart: ProductCartRes[]=[];
  private productsCartChangeObs: Subscription | undefined;

  constructor(
    private router: Router,
      private cartService: CartService) {
    }
  ngOnDestroy(): void {
    if(this.productsCartChangeObs){
      this.productsCartChangeObs.unsubscribe();
    }

  }

  ngOnInit() {
    this.productsCart =  this.cartService.productCartRes;
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}

