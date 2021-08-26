
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cart } from '../model/cart';
import { environment } from 'src/environments/environment';
import { ProductCartReq, ProductCartRes } from '../model/product-cart';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartUrl = '/cart';
  private productCartUrl = '/productCart';
  cartChangeObs = new Subject<Cart>();
  cart : Cart | undefined;
  productsCartChangeObs = new Subject<ProductCartRes[]>();
  productCartRes : ProductCartRes[]  = [];


  constructor(
    private http: HttpClient
  ) { }

  createCart(cart: Cart): Observable<any> {
    return this.http.post<any>(environment.api + this.cartUrl, cart, httpOptions).pipe(
      tap((c: any) => {
        this.log(`created Cart w/ id=${c.href}`)
        this.cart = cart
        this.cart.id = c.href.split("/")[5]
        this.cartChangeObs.next(this.cart);
      } ),
      catchError(this.handleError<Cart>('createCart'))
    );
  }

  updateCart(cart: Cart): Observable<any> {
    return this.http.put(environment.api + this.cartUrl+ '/' + cart.id , cart , httpOptions).pipe(
      tap(_ => this.log(`updated Cart id=${JSON.stringify(Cart)}`)),
      catchError(this.handleError<any>('updateCart'))
    );
  }


  addProductCart(pc: ProductCartReq): Observable<any> {
    return this.http.post<any>(environment.api + this.productCartUrl, pc, httpOptions).pipe(
      tap((c: any) => this.log(`add Product Cart w/ id=${c.href}`)),
      catchError(this.handleError<Cart>('createCart'))
    );
  }

  updateProductCart(pc: ProductCartReq): Observable<any> {
    return this.http.put(environment.api + this.productCartUrl , pc , httpOptions).pipe(
      tap(_ => this.log(`update ProductCart =${JSON.stringify(Cart)}`)),
      catchError(this.handleError<any>('updateCart'))
    );
  }

  getProductsByCart(id: string): Observable<ProductCartRes[]> {
    return this.http.get<ProductCartRes[]>(environment.api+this.productCartUrl+'ByCart/'+id)
      .pipe(
        tap(_ => {
          this.productsCartChangeObs.next(_);
          this.productCartRes = _;
          this.log('fetched Products Cart');
        }),
        catchError(this.handleError<ProductCartRes[]>('getProductsByCart', []))
      );
  }

  getCart(id: string): Observable<Cart> {
    return this.http.get<Cart>(environment.api + this.cartUrl + '/' + id , httpOptions).pipe(
      tap(_ => {
        this.log(`get Cart ${JSON.stringify(_)}`);
        this.cart = _;
        this.cartChangeObs.next(this.cart);
      }),
      catchError(this.handleError<any>('getCart'))
    );
  }

  deleteCart(id: string): Observable<Cart> {
    return this.http.delete<Cart>(environment.api + this.cartUrl + '/' + id , httpOptions).pipe(
      tap(_ => {
        this.log(`delete Cart ${JSON.stringify(_)}`);
      }),
      catchError(this.handleError<any>('getCart'))
    );
  }

  deleteProductCart(productId: string, cartId: string): Observable<Cart> {
    return this.http.delete<any>(environment.api + this.productCartUrl + '/' + productId+ '/' + cartId , httpOptions).pipe(
      tap(_ => {
        this.log(`delete ProductCart ${JSON.stringify(_)}`);
      }),
      catchError(this.handleError<any>('getCart'))
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
