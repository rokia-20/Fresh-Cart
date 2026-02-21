import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from './services/brand.service';
import { Brand } from './models/brand.interface';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { NgxPaginationModule } from "ngx-pagination";
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService);
  private readonly router = inject(Router);

  brandsList: Brand[] = [];
  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(pageNumber: number = 1): void {
    this.brandService.getBrands(pageNumber).subscribe({
      next: (response) => {
        this.brandsList = response.data;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.total = response.results;
      }
    });
  }

  
  goToBrand(id: string): void {
    this.router.navigate(['/brand', id]);
  }
}