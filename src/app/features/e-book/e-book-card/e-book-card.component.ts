import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { EBookService } from '../services/e-book.service';
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
import { EBookListResponse } from '~app/models/HttpResponse/EbookListResponse';
import { CopyToClipboardDirective } from '~app/shared/directives/copy/copy-to-clipboard';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ebook-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent, SpinnerComponent, CopyToClipboardDirective, RouterModule],
  templateUrl: './e-book-card.component.html',
  styleUrl: './e-book-card.component.scss',
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
export class EBookCardComponent implements OnInit {
  @Input() eBook!: EBookListResponse;

  constructor(
    private authService: AuthService,
    private eBookService: EBookService,
    protected eBookLoaderService: BookLoaderService,
    private toasterService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.authService.userSubject.subscribe((user) => {
      this.eBookService.favoriteBooksSubject.next(user?.favoriteBooks);
    });
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
