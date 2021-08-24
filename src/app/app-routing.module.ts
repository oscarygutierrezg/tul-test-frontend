import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {  path: 'products', component: ProductListComponent  },
  {  path: 'new', component: ProductFormComponent},
  {  path: 'edit/:id/:accion', component: ProductFormComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
