import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconoirNavArrowLeft, iconoirNavArrowRight } from '@ng-icons/iconoir';

interface carouselImages {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  viewProviders: [provideIcons({ iconoirNavArrowLeft, iconoirNavArrowRight })],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() images: carouselImages[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() autoPlay: boolean = false;
  @Input() interval: number = 15000;

  currentImageIndex: number = 0;
  carouselIntervalObject: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.autoPlay) {
      this.autoplayCarousel();
    }
  }

  ngOnDestroy(): void {
      clearInterval(this.carouselIntervalObject);
  }

  autoplayCarousel(): void {
    this.carouselIntervalObject = setInterval(() => {
      this.nextImage();
      this.cdr.detectChanges();
    }, this.interval);
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  previousImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.images.length - 1
        : this.currentImageIndex - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === this.images.length - 1
        ? 0
        : this.currentImageIndex + 1;
  }
}
