import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrandService } from '../brands/services/brand.service';
import { Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service'; 

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './brand-details.component.html',
//   styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly brandService = inject(BrandService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  brandId!: string;

  singleBrand: any = null;
  brandProducts: any[] = [];
  productsLoaded = false;
  productsCount = 0;
  numberOfPages = 0;
  pageSize = 40;
  p = 1;
  total = 0;

 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.brandId = params.get('id')!;
  
    
      this.singleBrand = null;
      this.brandProducts = [];
      this.productsLoaded = false;
      this.productsCount = 0;
      this.p = 1;
      this.total = 0;
      this.numberOfPages = 0;
  
      this.getBrandInfo();
      this.getBrandProducts(1);
    });
  }

  getBrandInfo(): void {
    this.brandService.getSpecificBrand(this.brandId).subscribe({
      next: (res) => {
        this.singleBrand = res.data;
      },
    });
  }

  
  getBrandProducts(pageNumber: number): void {
    
    this.brandProducts = [];
    this.productsLoaded = false;
    this.productsCount = 0;
  
    this.brandService.getProductsByBrand(this.brandId, pageNumber).subscribe({
      next: (res) => {
        this.brandProducts = Array.isArray(res.data) ? res.data : [];
        this.productsCount = res.results ?? this.brandProducts.length;
      
        this.pageSize = res.metadata?.limit ?? 40;
        this.p = res.metadata?.currentPage ?? 1;
        this.total = res.results ?? 0;
        this.numberOfPages = res.metadata?.numberOfPages ?? 0;
      
        this.productsLoaded = true;
      },
      error: (err) => {
        console.log('get products error', err);
        this.brandProducts = [];
        this.productsCount = 0;
        this.productsLoaded = true;
      }
    });
  }
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        
        this.cartService.countNumber.set(res?.numOfCartItems ?? res?.data?.numOfCartItems ?? 0);
        console.log('Added to cart', res);
      },
      error: (err) => {
        console.log('Add to cart error', err);
      }
    });
  }
  
  goToProductDetails(productId: string): void {
    this.router.navigate(['/details', productId]);
  }
  
}