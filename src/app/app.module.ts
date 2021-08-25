import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablePaginationComponent } from './angular-material/components/table-pagination/table-pagination';
import { ConfirmDialogComponent } from './angular-material/components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material/angular-material.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { InfoDialogComponent } from './angular-material/components/info-dialog/info-dialog.component';
import { ProductTypeDescPipe } from './pipes/product-type-desc.pipe';
import { ProductTypeFromStringPipe } from './pipes/product-type-from-string.pipe';
import { TablePaginationCartComponent } from './angular-material/components/table-pagination-cart/table-pagination-cart';
import { ProductCartComponent } from './components/product-cart/product-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    TablePaginationComponent,
    TablePaginationCartComponent,
    ConfirmDialogComponent,
    ProductCartComponent,
    InfoDialogComponent,
    NumberOnlyDirective,
    ProductTypeDescPipe,
    ProductTypeFromStringPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InfoDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

