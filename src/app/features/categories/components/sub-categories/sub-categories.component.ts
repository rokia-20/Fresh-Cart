import { Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubCategory } from '../../models/sub-category.interface';
import { CategoriesService } from '../../../../Core/services/categories/categories.service';
import { Category } from '../../../../Core/models/category.interface';

@Component({
  selector: 'app-sub-categories',
  // imports: [],
  imports: [RouterLink],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  categoryId: string | null = null;
  subCategories: SubCategory[] = [];
  mainCategory: Category = {} as Category;

  // ngOnInit(): void {
  //   this.getCategoryId();
  //   this.getSubCategories(this.categoryId!);
  //   this.getCategoryById(this.categoryId!)
  // }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
  
        if (this.categoryId) {
          this.getSubCategories(this.categoryId);
          this.getCategoryById(this.categoryId);
        }
      }
    });
  }
 

  getSubCategories(categoryId: string): void {
    this.categoriesService.getSubCategories(categoryId).subscribe({
      next: (response) => {
        this.subCategories = response.data;
      }
    })
  }

  getCategoryById(categoryId:string): void{
    this.categoriesService.getSpecificCategory(categoryId).subscribe({
      next:(res) => {
        this.mainCategory = res.data
      }
    })
  }

}
