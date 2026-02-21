import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/auth/services/auth.service';
import { User } from './models/user.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly fb = inject (FormBuilder)
  private readonly toastrService = inject(ToastrService)

  userdata!:User
  userForm!: FormGroup;
  isLoading: boolean = false;
  subscription : Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm()
    this.getLoggedUserData()

  }
  getLoggedUserData():void{
    this.authService.getUserData().subscribe({
      next:((res:User )=> {
        this.userForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
    })
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [this.userdata?.data?.name || null , [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [this.userdata?.data?.email || null , [Validators.required , Validators.email] ],
      phone: [this.userdata?.data?.phone || null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    });
  }

  submitForm():void{
    if(this.userForm.valid){
      this.isLoading = true;
      this.subscription.unsubscribe();
      this.subscription = this.authService.updateUserData(this.userForm.value).subscribe({
        next:((res) => {
          this.toastrService.success('Your Profile Data Updated successfully!', 'Success');
        })
      })
    }
  }
  

}
