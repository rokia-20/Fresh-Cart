import { Component, OnInit, inject } from '@angular/core';
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { WishlistService } from '../wishlist/services/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, MainSliderComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    // Initialize wishlist when home component loads
    this.wishlistService.initializeWishlist();
  }
}
