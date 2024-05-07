import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '~app/core/services/auth/auth.service';
import {
  iconoirFavouriteBook,
  iconoirShareAndroid,
  iconoirCopy,
  iconoirHeart,
} from '@ng-icons/iconoir';
import { ionHeart, ionHeartOutline } from '@ng-icons/ionicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { BookLoaderService } from '~app/core/services/loading/book-loader/book-loader.service';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';
import { MagazineListResponse } from '~app/models/HttpResponse/MagazineListResponse';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-magazine-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent, SpinnerComponent, RouterModule],
  templateUrl: './magazine-card.component.html',
  styleUrl: './magazine-card.component.scss',
  viewProviders: [
    provideIcons({
      iconoirShareAndroid,
      iconoirFavouriteBook,
      iconoirCopy,
      iconoirHeart,
      ionHeart,
      ionHeartOutline,
    }),
  ],
})

export class MagazineCardComponent implements OnInit {
  @Input() magazine!: MagazineListResponse;
  protected bookReservingLoaderText!: string;

  constructor(
    private authService: AuthService,
    protected bookLoaderService: BookLoaderService,
    private toasterService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
  }

  copyText(isbn: string): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard
        .writeText(isbn)
        .then(() => {
          this.toasterService.success('Copied to clipboard', isbn);
        })
        .catch((error) => {
          this.toasterService.error('Error copying to clipboard', error);
        });
    }
  }
}
