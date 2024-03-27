import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { PageService } from '../../core/services/page/page.service';
import { Title, Meta } from '@angular/platform-browser';
import { CarouselComponent } from '../../core/components/carousel/carousel.component';
import { Announcement } from '../../models/Announcement';
import { BackendService } from '../../core/services/backend/backend.service';
import { PaginationPipe } from '../../core/pipes/pagination/pagination.pipe';
import { Collection } from '../../core/models/Response/Collection';
@Component({
  standalone: true,
  imports: [CommonModule, CarouselComponent, PaginationPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BackendService],
})
export class HomeComponent implements OnInit {
  title = 'Tobeto Public Library';
  pageService!: PageService;
  images = [
    {
      src: 'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt: 'nature1',
    },
    {
      src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt: 'nature2',
    },
    {
      src: 'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      alt: 'person1',
    },
    {
      src: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      alt: 'person2',
    },
  ];
  announcements: Announcement[] = [];
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    @Inject(BackendService) private backendService: BackendService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.pageService = new PageService(
      this.locale,
      this.titleService,
      this.metaService
    );
    this.pageService.setPage();
  }

  ngOnInit() {
    console.log(this.fetchAnnouncements());
    console.log(
      this.fetchAnnouncement('E014EFC4-0973-4FC1-80BB-464B4D791173')
    );
  }

  fetchAnnouncements() {
    this.backendService
      .getAll<Announcement>('Announcements?PageIndex=0&PageSize=10')
      .subscribe((announcements: Collection<Announcement>) => {
        if (Array.isArray(announcements.items)) {
          this.announcements.push(...announcements.items);
        } else {
          console.error('items is not an array:', announcements.items);
        }
      });
    return this.announcements;
  }

  fetchAnnouncement(id: string) {
    this.backendService
      .getSingle<Announcement>('Announcements', id)
      .subscribe((announcement: Announcement) => {
        console.log(announcement);
      });
  }
}
