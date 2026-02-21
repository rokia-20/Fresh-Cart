import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpclient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data:object): Observable<any>{
    return this.httpclient.post(environment.baseUrl + 'auth/signup',data);
  }
  loginForm(data:object): Observable<any>{
    return this.httpclient.post(environment.baseUrl + 'auth/signin',data);
  }

  logOut(): void{
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  decodeToken() {
    let token
    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.logOut();
    }
    return token;
  }

  submitVerifyEmail(data:object): Observable<any>{
    return this.httpclient.post(environment.baseUrl + 'auth/forgotPasswords',data);
  }

  submitVerifyCode(data:object): Observable<any>{
    return this.httpclient.post(environment.baseUrl + 'auth/verifyResetCode',data);
  }

  submitResetPassword(data:object): Observable<any>{
    return this.httpclient.put(environment.baseUrl + 'auth/resetPassword' ,data); 
  }


  // ----------------------userData----------------------------------

  getUserData():Observable<any>{
    return this.httpclient.get(environment.baseUrl + 'users/getMe/')
  }

  updateUserData(data:object):Observable<any>{
    return this.httpclient.put(environment.baseUrl + 'users/updateMe/' , data)
  }

  changePassword(data:object):Observable<any>{
    return this.httpclient.put(environment.baseUrl + `users/changeMyPassword` , data)
  }
  
}
