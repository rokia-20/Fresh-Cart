import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/auth/services/auth.service';
import { AllordersService } from './services/allorders.service';
import { Order } from './models/order.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly authservice = inject(AuthService);
  private readonly allordersService = inject(AllordersService);

  token:any;
  ordersList:Order[] = [];

  ngOnInit(): void {
    this.getUserId();
    this.getAllOrders();
  }

  getUserId():void {
    this.token = this.authservice.decodeToken();
  }

  getAllOrders():void {
    this.allordersService.getUserOrders(this.token.id).subscribe({
      next:(res)=>{
        this.ordersList = res;
        
      }
    })
  }


}
