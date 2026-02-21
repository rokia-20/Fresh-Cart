import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/auth/services/auth.service';
import { InputComponent } from "../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly toastrService = inject (ToastrService)

  changeForm!: FormGroup
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.formInit()
  }
  formInit():void{
    this.changeForm = this.fb.group({
      currentPassword: [null , [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      password: [null , [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rePassword: [null , [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }, {validators: this.confirmPassword})
  }

  confirmPassword(group: AbstractControl) {
    if(group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({mismatch: true});
      return {mismatch: true};
    }
  }

  onSubmit():void{
    if(this.changeForm.valid){
      this.subscription.unsubscribe();
      this.subscription=this.authService.changePassword(this.changeForm.value).subscribe({
        next:((res) => {
          this.toastrService.success('Password Changed Successfully' , 'Success')
        })
      })
    }
  }
}
