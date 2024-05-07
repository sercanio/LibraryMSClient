import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EBookService } from '~app/features/e-book/services/e-book.service';
import { EbookResponse } from '~app/models/HttpResponse/EbookResponse';
import { CopyToClipboardDirective } from '~app/shared/directives/copy/copy-to-clipboard';
import { iconoirCopy } from '@ng-icons/iconoir';

@Component({
  standalone: true,
  templateUrl: './ebook-detail.component.html',
  styleUrls: ['./ebook-detail.component.scss'],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule,
    CopyToClipboardDirective,
  ],
  providers: [provideIcons({ iconoirCopy })],
})
export class EBookDetailComponent implements OnInit {
  ebook: EbookResponse = {
    id: '',
    isbnCode: '',
    eBookTitle: '',
    authorName: '',
    releaseDate: 0,
    pageCount: 0,
    categoryId: 0,
    fileUrl: '',
  };
  ebookId!: string;

  constructor(
    private route: ActivatedRoute,
    private ebookService: EBookService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.params.subscribe((params) => {
        this.ebookId = params['id'];
        this.loadEbookDetails(this.ebookId);
      });
    }
  }

  loadEbookDetails(ebookId: string) {
    this.ebookService.getById(ebookId).subscribe((response: EbookResponse) => {
      if (response) {
        this.ebook = response;
        this.ebookId = response.id;
      }
    });
  }
}
