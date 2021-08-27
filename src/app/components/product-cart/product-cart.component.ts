import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { ProductCartRes } from 'src/app/model/product-cart';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/angular-material/components/confirm-dialog/confirm-dialog.component';
import { CartStatusType } from 'src/app/model/cart-status-type';
import { TotalPipe } from 'src/app/pipes/total.pipe';
import { TotalDiscountPipe } from 'src/app/pipes/total-discount.pipe';
import { InfoDialogComponent } from 'src/app/angular-material/components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit,  OnDestroy{
  productsCart: ProductCartRes[]=[];
  private cart: Cart | undefined;
  
  
  private cartChangeObs: Subscription | undefined;
  private productsCartChangeObs: Subscription | undefined;

  constructor(
    private router: Router,
    
    private dialog: MatDialog,
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
    this.cart =  this.cartService.cart;
    this.cartChangeObs = this.cartService.cartChangeObs.subscribe( (cart: Cart) => {
      this.cart= cart;
     this.cartService.getProductsByCart(cart.id).subscribe(p => {
      console.log(JSON.stringify(p));
    });
    });
    this.productsCartChangeObs = this.cartService.productsCartChangeObs.subscribe( (p:  ProductCartRes[]) => {
      console.log(JSON.stringify(p));
      this.productsCart =  p;
    });
  }
 

  goCheckout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de finalizar con la compra?`,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(this.cart);
        if(this.cart){
        this.cart.estado = CartStatusType.CHECKOUT;
        this.cart.total =new TotalPipe().transform(this.productsCart);
        this.cart.descuento =new TotalDiscountPipe().transform(this.productsCart);
        this.cartService.updateCart(this.cart)
          .subscribe(p => {
            localStorage.removeItem('cartId');
            console.log(JSON.stringify(p));
            this.router.navigateByUrl('/end');
          });
        }
      }
    });
  }

  goEmpty() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de vaciar el carrito de compras?`,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(this.cart);
        if(this.cart){
          this.cart.estado = CartStatusType.DESERTED;
          this.cartService.updateCart(this.cart)
          .subscribe(p => {
            localStorage.removeItem('cartId');
            console.log(JSON.stringify(p));
            this.showModal('INFO', 'Carrito de compras vaciado satisfactoriamente');
            this.router.navigateByUrl('/');
          });
        }
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  showModal(title: string, body: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title,
        body,
      }
    });
}


}

