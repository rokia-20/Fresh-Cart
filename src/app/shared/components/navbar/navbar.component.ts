import { AuthService } from './../../../Core/auth/services/auth.service';
import { Component, computed, effect, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FlowbiteService } from '../../../Core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishlistService);
  private readonly id = inject(PLATFORM_ID);

  @Input() isLogin: boolean = false;
  count: Signal<number> = this.cartService.countNumber;
  wishlistCount: number = 0;

  constructor(private flowbiteService: FlowbiteService) {
    // Initial login state
    this.isLogin = !!this.authService.decodeToken();
    
    effect(() => {
      if (isPlatformBrowser(this.id)) {
        const favList = this.wishListService.favListSignal();
        this.wishlistCount = favList?.length || 0;
      }
    });
  }


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => initFlowbite());
  
    if (isPlatformBrowser(this.id)) {
      this.wishlistCount = 0;
      this.cartService.countNumber.set(0);
  
      if (this.isLogin) {
        this.loadUserData();
      }
    }
  }
  
  
  private loadUserData(): void {
    const token = this.authService.decodeToken();
    if (!token) return;
    
    this.getAllDataCart().subscribe({
      error: (err: any) => {
        this.cartService.countNumber.set(0);
      }
    });
    
    // Get wishlist data
    this.wishListService.getFavList().subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          // The wishlist service will update the signal
          // which our effect is already watching
        }
      },
      error: (err) => {
        // Error is already handled by the service
      }
    });
  }

  logout() {
    this.authService.logOut()
  }

  getAllDataCart(): Observable<any> {
    return this.cartService.getLoggedUserCart().pipe(
      tap({
        next: (res) => {
          if (res && res.numOfCartItems !== undefined) {
            this.cartService.countNumber.set(res.numOfCartItems);
          }
        },
        error: (err) => {
          this.cartService.countNumber.set(0);
          throw err; 
        }
      })
    );
  }

  getAllDataFav(): void {
    this.wishListService.getFavList().subscribe({
      next: (res) => {
        this.wishListService.favListSignal.set(res.data.length)
      }
    })
  }
}
