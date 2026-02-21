import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly httpclient = inject(HttpClient);

  getAllProducts( pageNumber:number = 1): Observable<any>{
    return this.httpclient.get(environment.baseUrl + `products?page=${pageNumber}`);
  }

  getProductsByCategory(categoryId: string, pageNumber: number = 1): Observable<any> {
    return this.httpclient.get(
      environment.baseUrl + `products?category=${categoryId}&page=${pageNumber}`
    );
  }
}
