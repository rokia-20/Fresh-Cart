import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../Core/models/product.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id: string | null = null;
  productDetails: Product = {} as Product;
  selectedImage: string = '';

  ngOnInit(): void {
    this.getProductId(),
    this.getProductDetailsData()
    
  }
  

  getProductId() :void{
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      }
    })
  }

  getProductDetailsData() : void {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      }
    })
  }

  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'Success');
        }
      }
    })
  }

  filenameOf(url: string = ''): string {
    return url.split('/').pop()?.split('?')[0].toLowerCase() || '';
  }
  
  swapWithCover(clickedImg: string) {
    if (!this.productDetails) return;
  
    const { imageCover, images } = this.productDetails;
    if (!clickedImg || this.filenameOf(clickedImg) === this.filenameOf(imageCover)) return;
  
    const idx = images.findIndex((i: string) => this.filenameOf(i) === this.filenameOf(clickedImg));
    this.productDetails.imageCover = clickedImg;
    this.productDetails.images = idx > -1
      ? images.map((img: string, i: number) => i === idx ? imageCover : img)
      : [imageCover, ...images];
  }
  
}
