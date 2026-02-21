import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, InputComponent , CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

  verifyEmail!: FormGroup
  verifyCode!: FormGroup
  resetPassword!: FormGroup
  step: number = 1

  ngOnInit(): void {
    this.initForms()
  }

  initForms() {
    this.verifyEmail = this.fb.group({
      email: [null , [Validators.required, Validators.email]]
    })

    this.verifyCode = this.fb.group({
      resetCode : [null , [Validators.required]]
    })

    this.resetPassword = this.fb.group({
      email : [null , [Validators.required, Validators.email]],
      newPassword : [null , [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    })
  }

  onSubmitEmail(){
    if(this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'Success');
          this.step = 2
        }
      })
    }
  }

  onSubmitCode(){
    if(this.verifyCode.valid){
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          this.toastrService.success('Verification successful!', 'Success');
          this.step = 3
        }
      })
    }
  }

  onSubmitNewPassword(){
    if(this.resetPassword.valid) {
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.toastrService.success('Password has been updated successfully', 'Success');
          this.cookieService.set('token', res.token)
          this.router.navigate(['/home'])
        }
      })
    }

  }

}
