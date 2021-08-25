import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { ProductCartRes } from 'src/app/model/product-cart';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit,  OnDestroy{
  productsCart: ProductCartRes[]=[];
  private products: Product[]=[];
  private qty: number = 0;
  
  
  private cartChangeObs: Subscription | undefined;
  private productsCartChangeObs: Subscription | undefined;

  constructor(
    private router: Router,
      private cartService: CartService) {
    }
  ngOnDestroy(): void {
    if(this.cartChangeObs){
      this.cartChangeObs.unsubscribe();
    }
    if(this.productsCartChangeObs){
      this.productsCartChangeObs.unsubscribe();
    }

  }

  ngOnInit() {
    this.productsCart =  this.cartService.productCartRes;
    console.log('this.productsCart', this.productsCart)
    this.cartChangeObs = this.cartService.cartChangeObs.subscribe( (cart: Cart) => {
     this.cartService.getProductsByCart(cart.id).subscribe(p => {
      console.log(JSON.stringify(p));
    });
    });
    this.productsCartChangeObs = this.cartService.productsCartChangeObs.subscribe( (p:  ProductCartRes[]) => {
      console.log(JSON.stringify(p));
      this.productsCart =  p;
      this.qty = p.length;
    });
  }
  
  get productsQty() {
    return this.qty;
  }

  goNewProduct() {
    this.router.navigateByUrl('/new');
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}

