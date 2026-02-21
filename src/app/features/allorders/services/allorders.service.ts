import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {
  private readonly httpClient = inject(HttpClient);

  getUserOrders(userId: string):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${userId}`);
  }
  
}
