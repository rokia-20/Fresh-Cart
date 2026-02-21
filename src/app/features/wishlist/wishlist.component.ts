import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Product } from '../../Core/models/product.interface';
import { CardComponent } from "../../shared/components/card/card.component";

@Component({
  selector: 'app-wishlist',
  imports: [CardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  favProducts: WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit(): void {
    this.getALLWishlistItems();
  }
  
  getALLWishlistItems(): void {
    this.wishlistService.getFavList().subscribe({
      next: (items) => {
        this.favProducts.set(items.data);
      }
    })
  }

  removeFromWishlist(id: string): void {
    this.wishlistService.removeFavItem(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.favProducts.update((products) =>
            products.filter((p) => p._id !== id)
          );
        }
      }
    });
  }

}
