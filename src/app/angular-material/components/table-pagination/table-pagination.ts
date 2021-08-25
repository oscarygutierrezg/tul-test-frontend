import { Product } from '../../../model/product';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CartService } from 'src/app/services/car.service';
import { Cart } from 'src/app/model/cart';
import { ProductCartReq, ProductCartRes } from 'src/app/model/product-cart';

@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})

export class TablePaginationComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['nombre', 'sku', 'descripcion', 'tipoProducto','precio','descuento','acciones'];


  dataSource: any;
  private products: Product[] = [];
  private productsChangeObs: Subscription | undefined;

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator | undefined;
  private cartChangeObs: Subscription | undefined;
  private productsCartChangeObs: Subscription | undefined;
  cart: Cart | undefined;
  productsCart: ProductCartRes[] = [];
  newCart: Cart | undefined;
  productCartReq: ProductCartReq | undefined;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private dialog: MatDialog
    ) {
    }
  
  ngOnInit() {
    this.productsChangeObs = this.productService.productsChangeObs.subscribe( (products: Product[]) => {
        this.products = products;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
    });
    this.cartChangeObs = this.cartService.cartChangeObs.subscribe( (cart: Cart) => {
      this.cart =cart;
      this.cartService.getProductsByCart(cart.id).subscribe(p => {
        console.log(JSON.stringify(p));
        });
     });
     this.productsCartChangeObs = this.cartService.productsCartChangeObs.subscribe( (pc: ProductCartRes[]) => {
      this.productsCart =pc;
     });
  }


  ngOnDestroy() {
    if(this.cartChangeObs){
      this.cartChangeObs.unsubscribe();
    }
    if(this.productsChangeObs){
      this.productsChangeObs.unsubscribe();
    }
    if(this.productsCartChangeObs){
      this.productsCartChangeObs.unsubscribe();
    }
  }

  buscar() {
    this.productService.getProducts().subscribe(todos => {
      console.log(JSON.stringify(todos));
    });
  }

  add(id: string) {
    const rq = new ProductCartReq();
    if(!this.cart){
      this.newCart = new Cart();
      this.cartService.createCart(new Cart()).subscribe(p => {
        console.log(JSON.stringify(p));
        
        rq.cantidad =1; 
        rq.cartId = p.href.split("/")[5]; 
        rq.productId = id; 
        this.cartService.addProductCart(rq).subscribe(product => {
          console.log(JSON.stringify(product));

          this.cartService.getProductsByCart(rq.cartId ).subscribe(p => {
            console.log(JSON.stringify(p));
          });
          
        });
      });
    } else {
      rq.cantidad =1; 
      const p = this.productsCart.find(p => p.product.id === id) 
      if(p){
        rq.cantidad =p.cantidad + 1;
      }
     
        
        rq.cartId = this.cart.id; 
        rq.productId = id; 
        this.cartService.addProductCart(rq).subscribe(product => {
          console.log(JSON.stringify(product));
          this.cartService.getProductsByCart(rq.cartId ).subscribe(p => {
            console.log(JSON.stringify(p));
          });
        });
    }
  }

  edit(id: string) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  delete(id: string, nombre : string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de eliminar el producto  ${nombre}?`,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(id)
          .subscribe(p => {
            console.log(JSON.stringify(p));
            this.productService.getProducts();
          });
      }
    });
  }



  
}


