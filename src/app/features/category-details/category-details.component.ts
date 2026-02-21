import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsService } from '../../Core/services/products/products.service';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  categoryId!: string;

  products: any[] = [];
  productsLoaded = false;

  pageSize = 40;
  p = 1;
  total = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id')!;

      // reset
      this.products = [];
      this.productsLoaded = false;
      this.p = 1;
      this.total = 0;

      this.getCategoryProducts(1);
    });
  }

  getCategoryProducts(pageNumber: number): void {
    this.productsLoaded = false;

    this.productsService.getProductsByCategory(this.categoryId, pageNumber).subscribe({
      next: (res: any) => {
        this.products = res.data ?? [];
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
        this.productsLoaded = true;
      },
      error: () => {
        this.products = [];
        this.total = 0;
        this.productsLoaded = true;
      }
    });
  }

  goToProductDetails(productId: string): void {
    this.router.navigate(['/details', productId]);
  }

  addToCart(productId: string, event: MouseEvent): void {
    event.stopPropagation(); // ✅ prevents opening details page
  
    this.cartService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        this.cartService.countNumber.set(
          res?.numOfCartItems ?? res?.data?.numOfCartItems ?? 0
        );
      },
      error: (err: any) => console.log(err)
    });
  }
}