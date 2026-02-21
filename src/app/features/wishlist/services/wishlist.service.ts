import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../../Core/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  // Signal for wishlist items
  private wishlistItems = signal<Product[]>([]);
  
  // Signal for wishlist count (used in navbar)
  wishlistCount = computed(() => this.wishlistItems().length);
  
  private wishlistItemIds = signal<Set<string>>(new Set());
  
  favListSignal = this.wishlistItems;
  private favListSubject = new BehaviorSubject<Product[]>([]);
  favList$ = this.favListSubject.asObservable();

  private isInitialized = false;

  constructor() {
    // Don't load wishlist automatically
    this.favListSignal.set([]);
    this.favListSubject.next([]);
  }

  // Call this method when user reaches home page
  initializeWishlist(): void {
    if (this.isInitialized || !isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      return;
    }

    this.isInitialized = true;
    this.getFavList().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.favListSignal.set(res.data);
          this.favListSubject.next(res.data);
        }
      },
      error: (err) => {
        console.error('Failed to load wishlist:', err);
      }
    });
  }

  addToFav(productId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'wishlist', { 'productId': productId }).pipe(
      map((res: any) => {
        if (res.status === 'success') {
          this.wishlistItemIds.update(ids => new Set([...ids, productId]));
        }
        return res;
      })
    );
  }

  getFavList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist').pipe(
      tap((res: any) => {
        if (res.status === 'success') {
          this.wishlistItems.set(res.data);
          this.favListSubject.next(res.data);
          const ids = new Set<string>();
          res.data.forEach((item: Product) => ids.add(item._id));
          this.wishlistItemIds.set(ids);
        }
      })
    );
  }

  removeFavItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`).pipe(
      map((res: any) => {
        if (res.status === 'success') {
          this.wishlistItems.update(items => items.filter(item => item._id !== id));
          this.favListSubject.next(this.wishlistItems());
          this.wishlistItemIds.update(ids => {
            ids.delete(id);
            return new Set(ids);
          });
        }
        return res;
      })
    );
  }

  isInWishlist(productId: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // Default to false on server-side
    }
    return this.wishlistItemIds().has(productId);
  }

  toggleWishlist(productId: string, product?: Product): Observable<boolean> {
    if (this.isInWishlist(productId)) {
      return this.removeFavItem(productId).pipe(
        map(() => {
          this.wishlistItemIds.update(ids => {
            ids.delete(productId);
            return new Set(ids);
          });
          return false;
        })
      );
    } else {
      return this.addToFav(productId).pipe(
        map((res: any) => {
          if (res.status === 'success' && product) {
            this.wishlistItems.update(items => [...items, product]);
            this.favListSubject.next(this.wishlistItems());
            this.wishlistItemIds.update(ids => new Set([...ids, productId]));
          }
          return true;
        })
      );
    }
  }


  
}
