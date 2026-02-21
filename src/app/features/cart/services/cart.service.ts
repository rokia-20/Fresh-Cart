import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  countNumber:WritableSignal<number> = signal(null as unknown as number);

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'cart' , {'productId':id});
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}` , {'count':count});
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart`);
  }

  checkOutSession(id: string | null, data: object): Observable<any> {
    const currentOrigin = window.location.origin; 
    return this.httpClient.post(
      `${environment.baseUrl}orders/checkout-session/${id}?url=${currentOrigin}`,
      data
    );
  }

  createCashOrder(id:string | null , data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`,data)
  }


}
