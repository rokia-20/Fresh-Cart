import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly httpclient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.httpclient.get(environment.baseUrl + 'categories');
  }

  getSpecificCategory(categoryId : string): Observable<any> {
    return this.httpclient.get(environment.baseUrl + `categories/${categoryId}`)
  }

  getSubCategories(categoryId: string): Observable<any>{
    return this.httpclient.get(environment.baseUrl + `categories/${categoryId}/subcategories`);
  }
}
