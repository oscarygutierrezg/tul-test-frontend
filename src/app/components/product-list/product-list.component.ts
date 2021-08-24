import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private personas: Product[]=[];
  constructor(
    private router: Router,
    private personaService: ProductService) {
    }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.personaService.getProducts()
    .subscribe(personas => {
      this.personas = personas;
    });
  }

  goNewProduct() {
    this.router.navigateByUrl('/new');
  }

}

