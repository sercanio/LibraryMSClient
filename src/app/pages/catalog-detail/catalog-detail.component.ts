import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CopyToClipboardDirective } from '~app/shared/directives/copy/copy-to-clipboard';
import { iconoirCopy } from '@ng-icons/iconoir';
import { BookResponse } from '~app/models/HttpResponse/BookResspone';
import { EbookResponse } from '~app/models/HttpResponse/EbookResponse';
import { MagazineResponse } from '~app/models/HttpResponse/MagazineResponse';
import { CatalogResponse } from '~app/models/HttpResponse/CatalogResponse';
import { BookStatusPipe } from '~app/features/book/pipes/book-status.pipe';
import { BookService } from '~app/features/book/services/book.service';
import { AuthService } from '~app/core/services/auth/auth.service';
import { BookLoaderService } from '~app/core/services/loading/book-loader/book-loader.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { iconoirHeart } from '@ng-icons/iconoir';
import { ionHeartOutline } from '@ng-icons/ionicons';
import { CatalogService } from '~app/features/catalog/services/catalog.service';

@Component({
  standalone: true,
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss'],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule,
    CopyToClipboardDirective,
    SpinnerComponent,
  ],
  viewProviders: [
    provideIcons({
      iconoirCopy,
      iconoirHeart,
      ionHeartOutline,
    }),
  ],
  providers: [BookStatusPipe],
})
export class CatalogDetailComponent implements OnInit {
  catalog!: CatalogResponse;
  catalogId!: string;
  name!: string;
  books: BookResponse[] = [];
  magazines: MagazineResponse[] = [];
  materials: any[] = [];
  eBooks: EbookResponse[] = [];
  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private catalogService: CatalogService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private bookLoaderService: BookLoaderService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.params.subscribe((params) => {
        this.catalogId = params['id'];
        this.loadCatalogDetails(this.catalogId);
      });
    }
  }

  loadCatalogDetails(catalogId: string) {
    this.catalogService
      .getById(catalogId)
      .subscribe((response: CatalogResponse) => {
        if (response) {
          this.catalog = response;
          this.name = response.name;
          this.books = response.books;
          this.magazines = response.magazines;
          this.materials = response.materials;
          this.eBooks = response.eBooks;
          this.imageUrl = response.imageUrl;
        }
      });
  }

  // Implement other functionalities as needed
}
