import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../Core/services/categories/categories.service';
import { Category } from '../../../../Core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categories = inject(CategoriesService)

  categoriesList: Category[] = [];

  ngOnInit(): void {
    this.getAllCategoriesData();
  }


  getAllCategoriesData() {
    return this.categories.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      }
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 6
      }
    },
    nav: true
  }

}
