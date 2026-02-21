import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
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
    items: 1,
    nav: true,
    responsive: {
      0: {
        items: 1  // always 1 item on mobile
      },
      640: {
        items: 1  // always 1 item on small screens
      },
      768: {
        items: 1  // always 1 item on medium screens
      },
      1024: {
        items: 1  // always 1 item on large screens
      },
      1280: {
        items: 1  // always 1 item on extra-large screens
      }
    }
  }


}
