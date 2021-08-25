import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';

const routes: Routes = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {  path: 'products', component: ProductListComponent  },
  {  path: 'new', component: ProductFormComponent},
  {  path: 'cart', component: ProductCartComponent},
  {  path: 'edit/:id', component: ProductFormComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
