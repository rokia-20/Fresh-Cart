import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedroute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService)

  checkOutForm!: FormGroup
  id:string | null = null

  ngOnInit(): void {
    this.initForm();
    this.getCartId()
  }

  getCartId(): void {
    this.activatedroute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    })
  }

  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details : [null , [Validators.required]],
        phone : [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city : [null , [Validators.required]],
      })
    }) 
  }

  submitVisa(): void {
    if(this.checkOutForm.valid){
      this.cartService.checkOutSession(this.id , this.checkOutForm.value).subscribe({
        next: (res) => {
          if(res.status === 'success'){
            window.open(res.session.url , '_self')
          }
        }
      })
      
    }
  }

  submitCash(): void {
    if (this.checkOutForm.valid) {
      this.cartService.createCashOrder(this.id, this.checkOutForm.value).subscribe({
        next: (res) => {
          this.cartService.countNumber.set(0);
          if (res.status === 'success') {
            this.toastrService.success(
              'Your cash-on-delivery order has been placed successfully! 🎉',
              'Success'
            );
            this.checkOutForm.reset(); 
          }
        }
      });
    }
  }
  

}
