
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../model/product';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productUrl = '/product';
  productsChangeObs = new Subject<Product[]>();


  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api}${this.productUrl}`)
      .pipe(
        tap(_ => {
          this.productsChangeObs.next(_);
          this.log('fetched Products');
        }),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<any>(environment.api + this.productUrl, product, httpOptions).pipe(
      tap((p: any) => this.log(`added Product w/ id=${p.href}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(environment.api + this.productUrl+ '/' + product.id , product , httpOptions).pipe(
      tap(_ => this.log(`updated Product id=${JSON.stringify(Product)}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(environment.api + this.productUrl + '/' + id , httpOptions).pipe(
      tap(_ => {
        this.log(`get Product ${JSON.stringify(_)}`);
        this.getProducts().subscribe(products => {
        });
      }),
      catchError(this.handleError<any>('getProduct'))
    );
  }

  getProductBySku(sku: string): Observable<Product[]> {
    return this.http.get<Product>(environment.api + this.productUrl + '/sku/' + sku, httpOptions).pipe(
      tap(_ => {
        this.log(`get Product ${JSON.stringify(_)}`);
      }),
      catchError(this.handleError<any>('getProduct'))
    );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(environment.api + this.productUrl + '/' + id , httpOptions).pipe(
      tap(_ => {
        this.log(`get Product ${JSON.stringify(_)}`);
        this.getProducts().subscribe(products => {
        });
      }),
      catchError(this.handleError<any>('getProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
