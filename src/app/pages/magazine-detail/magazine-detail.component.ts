import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EBookService } from '~app/features/e-book/services/e-book.service';
import { EbookResponse } from '~app/models/HttpResponse/EbookResponse';
import { CopyToClipboardDirective } from '~app/shared/directives/copy/copy-to-clipboard';
import { iconoirCopy } from '@ng-icons/iconoir';
import { MagazineResponse } from '~app/models/HttpResponse/MagazineResponse';
import { MagazineService } from '~app/features/magazine/services/magazine.service';

@Component({
  standalone: true,
  templateUrl: './magazine-detail.component.html',
  styleUrls: ['./magazine-detail.component.scss'],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule,
    CopyToClipboardDirective,
  ],
  providers: [provideIcons({ iconoirCopy })],
})
export class MagazineetailComponent implements OnInit {

  magazine: MagazineResponse = {
    id: '',
    issnCode: '',
    magazineTitle: '',
    releaseDate: '',
    number: 0,
    publisherId: '',
    categoryId: 0,
  };
  magazineId!: string;

  constructor(
    private route: ActivatedRoute,
    private magazineService: MagazineService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.params.subscribe((params) => {
        this.magazineId = params['id'];
        this.loadMagazineDetails(this.magazineId);
      });
    }
  }

  loadMagazineDetails(ebookId: string) {
    this.magazineService.getById(ebookId).subscribe((response: MagazineResponse) => {
      if (response) {
        this.magazine = response;
        this.magazineId = response.id;
      }
    });
  }
}
