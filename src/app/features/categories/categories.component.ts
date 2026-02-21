import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../Core/models/category.interface';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../Core/services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-categories',
  imports: [RouterLink ,CommonModule ,FormsModule ,SearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService);

  categoriesList: Category[] = []
  text:string = '';

  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesList = response.data;
      }
    })
  }

}
