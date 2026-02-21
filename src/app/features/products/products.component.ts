import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Product } from '../../Core/models/product.interface';
import { ProductsService } from '../../Core/services/products/products.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent , NgxPaginationModule , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productList:Product[] = [];

  pageSize!: number;
  p!: number;
  total!: number;
  text:string = '';

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(pageNumber:number = 1) {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (response) => {
        this.productList = response.data;
        this.pageSize = response.metadata.limit;
        this.p= response.metadata.currentPage;
        this.total = response.results;
      }
    });
  }
}
