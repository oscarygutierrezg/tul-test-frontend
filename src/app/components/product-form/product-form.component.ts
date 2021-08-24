import { Product } from '../../model/product';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { ProductType } from '../../model/product-type';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmDialogComponent } from 'src/app/angular-material/components/confirm-dialog/confirm-dialog.component';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfoDialogComponent } from 'src/app/angular-material/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product;
  productForm: FormGroup = this.setFormControl();
  nameCtrl: FormControl = new FormControl;
  descriptionCtrl: FormControl = new FormControl;
  precioCtrl: FormControl = new FormControl;
  descuentoCtrl: FormControl = new FormControl;
  skuCtrl: FormControl = new FormControl;
  quantity: number =0;
  discount: number =1;
  typeCtrl: FormControl = new FormControl;
  idProduct: string =  "";
  action: string =  "";
  productTypes = [ProductType.WITHOUT_DISCOUNT,ProductType.WITH_DISCOUNT]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog) {
  }


  ngOnInit(): void {

    this.idProduct = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['accion'];
    this.quantity = 0;
    if (this.idProduct) {
      this.productService.getProduct(this.idProduct).subscribe(product => {
        if (product.precio <= 0 && this.action === 'disminuir') {
          this.showModal('ERROR', 'El stock actual no permite disminuir el inventario');
          this.router.navigateByUrl('/');
        }
        this.product = product;
        this.setFormControl();
      });
    } else {
      this.product = new Product();
      this.setFormControl();
    }
  }

  setFormControl() {
    this.nameCtrl = new FormControl(this.product.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]);

      this.skuCtrl= new FormControl(this.product.sku, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]);

      this.descriptionCtrl = new FormControl(this.product.descripcion, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]);

      this.typeCtrl = new FormControl(this.product.tipoProducto, [
        Validators.required
      ]);
      this.precioCtrl = new FormControl(this.quantity, [Validators.required, Validators.min(1), Validators.max(9999999)]);
      this.descuentoCtrl = new FormControl(this.quantity, [Validators.required, Validators.min(0), Validators.max(100)]);
      
    return new  FormGroup({
      productName: this.nameCtrl,
      productSku: this.skuCtrl,
      productType: this.typeCtrl,
      productDescription: this.descriptionCtrl,
      productQuantity: this.precioCtrl,
      productDiscount: this.descuentoCtrl
    }, );
  }

  get productType() {
    return this.productForm.get('productType');
  }

  get productSku() {
    return this.productForm.get('productSku');
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get productDescription() {
    return this.productForm.get('productDescription');
  }

  get productDiscount() {
    return this.productForm.get('productDiscount');
  }

  get productQuantity() {
    return this.productForm.get('productQuantity');
  }


  guardar() {
    if (this.idProduct) {
      if (this.action === 'disminuir' && ((this.product.precio - this.quantity) < 0 )) {
      this.showModal('ERROR', `El stock actual ${this.product.precio} no permite disminuir el inventario en ${this.quantity}`);
      return;
    }
      this.onConfirmUpdate();
    } else {
      this.product.id = '';
      this.product.precio = this.quantity;
      this.productService.addProduct(this.product)
        .subscribe(product => {
          console.log(JSON.stringify(product));
          this.productService.getProducts();
          this.router.navigateByUrl('/');
        });
    }
  }

  onConfirmUpdate() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de  ${this.action} en  ${this.quantity} el producto  ${this.product.nombre}?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.action === 'aumentar') {
          this.product.precio += this.quantity;
        } else if (this.action === 'disminuir') {
          this.product.precio -= this.quantity;
        }
        this.productService.updateProduct(this.product)
          .subscribe(product => {
            console.log(JSON.stringify(product));
            this.productService.getProducts();
            this.router.navigateByUrl('/');
          });
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