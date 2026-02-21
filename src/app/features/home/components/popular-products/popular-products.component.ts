import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Product } from '../../../../Core/models/product.interface';
import { ProductsService } from '../../../../Core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productList:Product[] = [];

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(pageNumber:number = 2) {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (response) => {
        this.productList = response.data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
