import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent,RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  subscription : Subscription = new Subscription();
  registerForm !: FormGroup 

  ngOnInit(): void {
    this.initForm();
    this.rePasswordControl = this.registerForm.get('rePassword');
  }

  initForm():void{
    this.registerForm = this.fb.group({
      name: [null , [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [null , [Validators.required, Validators.email]],
      password: [null , [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rePassword: [null , [Validators.required]],
      phone: [null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    } , {validators: this.confirmPassword})
  }

  nameControl : any
  emailControl : any 
  passwordControl : any 
  rePasswordControl : any 
  phoneControl : any 

  flag: boolean = true;
  errMsg: string = '';
  isLoading: boolean = false;

  submit() {
    if(this.registerForm.valid) {
      this.isLoading = true;
      this.subscription.unsubscribe();
      this.subscription = this.authservice.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          this.isLoading = false;
        }
      });
    } else {
      this.registerForm.setErrors({mismatch: true});
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    if(group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({mismatch: true});
      return {mismatch: true};
    }
  }

}
