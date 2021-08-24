import { Product } from '../../../model/product';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})

export class TablePaginationComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['nombre', 'sku', 'descripcion', 'tipoProducto','precio','descuento','acciones'];


  dataSource: any;
  private products: Product[] | undefined;
  private ids: string[] = [];
  private productsChangeObs: Subscription | undefined;

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private productService: ProductService,
    ) {
    }

  ngOnInit() {
    this.productsChangeObs = this.productService.productsChangeObs.subscribe( (products: Product[]) => {
        if ( this.ids.length === 0 ) {
          products.forEach( t => {
            this.ids.push(t.id);
          });
        }
        this.products = products;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
    });
  }


  ngOnDestroy() {
    this.productsChangeObs?.unsubscribe();
  }

  buscar() {
    this.productService.getProducts().subscribe(todos => {
      console.log(JSON.stringify(todos));
    });
  }

  aumentar(id: number) {
    this.router.navigateByUrl(`/edit/${id}/aumentar`);
  }

  disminuir(id: number, quantity: number) {
    if (quantity > 0){
      this.router.navigateByUrl(`/edit/${id}/disminuir`);
    }
  }




}


