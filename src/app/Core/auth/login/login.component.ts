import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  subscription: Subscription = new Subscription();
  loginForm !: FormGroup 

  ngOnInit(): void {
    this.initForm();

    this.emailControl = this.loginForm.get('email');
    this.passwordControl = this.loginForm.get('password');
  }

  initForm():void{
    this.loginForm = this.fb.group({
      email: [null , [Validators.required, Validators.email]],
      password: [null , [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  emailControl : any 
  passwordControl : any 
  flag: boolean = true;
  errMsg: string = '';
  isLoading: boolean = false;

  submit() {
    if(this.loginForm.valid) {
      this.isLoading = true;
      this.subscription.unsubscribe();
      this.subscription = this.authservice.loginForm(this.loginForm.value).subscribe({
        next: (res:any) => {
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
          this.isLoading = false;
          // console.log(this.authservice.decodeToken());
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }


}
