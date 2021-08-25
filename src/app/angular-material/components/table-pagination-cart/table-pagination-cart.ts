import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductCartReq, ProductCartRes } from 'src/app/model/product-cart';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table-pagination-cart',
  styleUrls: ['table-pagination-cart.css'],
  templateUrl: 'table-pagination-cart.html',
})

export class TablePaginationCartComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'sku', 'descripcion', 'tipoProducto', 'precio', 'descuento', 'cantidad', 'acciones'];
  private productsCartChangeObs: Subscription | undefined;
  dataSource: any;
  @Input() products: ProductCartRes[] = [];

  @ViewChild(MatPaginator, {
    static: false
  })
  paginator: MatPaginator | undefined;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService,
  ) {}

  ngOnDestroy(): void {
    if(this.productsCartChangeObs){
      this.productsCartChangeObs.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource < ProductCartRes > (this.products);
    this.dataSource.paginator = this.paginator;
    this.productsCartChangeObs = this.cartService.productsCartChangeObs.subscribe( (p: ProductCartRes[]) => {
      this.products = p;
      this.dataSource = new MatTableDataSource<ProductCartRes>(this.products);
      this.dataSource.paginator = this.paginator;
  });
  }

  add(id: string) {
    const rq = new ProductCartReq();
    const p = this.products.find(p => p.product.id === id);
    if (p) {
      rq.cantidad = p.cantidad + 1;
      this.updateProductCart(rq, p);
    }
  }

  minus(id: string) {
    const rq = new ProductCartReq();
    const p = this.products.find(p => p.product.id === id);
    if (p) {
      rq.cantidad = p.cantidad - 1;
      if(rq.cantidad  !== 0){
        this.updateProductCart(rq, p);
      } else{
        this.delete(p);
      }

    }

  }

  delete(p: ProductCartRes) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de eliminar del carrito de compras el producto  ${p.product.nombre}?`,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.deleteProductCart(p.product.id,p.cart.id)
          .subscribe(e => {
            console.log(JSON.stringify(e));
            this.cartService.getProductsByCart(p.cart.id).subscribe(p => {
              console.log(JSON.stringify(p));
            });
          });
      }
    });
  }
  
  updateProductCart(rq: ProductCartReq, p: ProductCartRes) {
    rq.cartId = p.cart.id;
      rq.productId = p.product.id;
      this.cartService.updateProductCart(rq).subscribe(product => {
        console.log(JSON.stringify(product));
        this.cartService.getProductsByCart(rq.cartId).subscribe(p => {
          console.log(JSON.stringify(p));
        });
      });
  }

}
