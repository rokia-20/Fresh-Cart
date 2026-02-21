import { Component, inject, Input, OnInit, output, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../../Core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe ,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required: true}) product:Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);
  isBrowser = false;

   // ✅ New way
  removedFromWishlist = output<string>();

  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.countNumber.set(res.numOfCartItems);
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'Success');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isInWishlist(id: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // Default to false on server-side
    }
    return this.wishlistService.isInWishlist(id);
  }

  toggleWishlist(product: Product) {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't run on server-side
    }
    this.wishlistService.toggleWishlist(product._id, product).subscribe({
      next: (isInWishlist: boolean) => {
        if (isInWishlist) {
          this.toastrService.success('Product added to wishlist', 'Success');
        } else {
          this.toastrService.success('Product removed from wishlist', 'Success');
          this.removedFromWishlist.emit(product._id);
        }
      },
      error: (err) => {
        console.error('Error updating wishlist:', err);
        this.toastrService.error('Failed to update wishlist', 'Error');
      }
    });
  }
}
