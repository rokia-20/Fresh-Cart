import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly httpClient = inject(HttpClient);
  getBrands(pageNumber:number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `brands?page=${pageNumber}`);
  }

  getSpecificBrand(id:string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `brands/${id}`);
  }

  getProductsByBrand(brandId: string, pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `products?brand=${brandId}&page=${pageNumber}`
    );
  }
  
  
}
