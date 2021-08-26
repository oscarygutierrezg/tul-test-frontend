import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { ProductCartRes } from 'src/app/model/product-cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,  OnDestroy{
  productsCart: ProductCartRes[]=[];
  private products: Product[]=[];
  
  
  private cartChangeObs: Subscription | undefined;
  private productsCartChangeObs: Subscription | undefined;

  constructor(
    private router: Router,
    private personaService: ProductService,
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
    this.getProducts();
    this.cartChangeObs = this.cartService.cartChangeObs.subscribe( (c: Cart) => {
      this.cartService.getProductsByCart(c.id).subscribe(p => {
        console.log(JSON.stringify(p));
      });
    });
    this.productsCartChangeObs = this.cartService.productsCartChangeObs.subscribe( (p:  ProductCartRes[]) => {
      this.productsCart =  p;
    });
  }
  
  getProducts(): void {
    this.personaService.getProducts()
    .subscribe(products => {
      this.products = products;
    });
  }
  goCart() {
    this.router.navigateByUrl('/cart');
  }
  
  goNewProduct() {
    this.router.navigateByUrl('/new');
  }
}

