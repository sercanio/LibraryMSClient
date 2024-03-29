import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Announcement } from '~models/Announcement';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnnouncementService } from '~features/announcement/services/announcement.service';
import { Collection } from '~app/core/models/Response/Collection';

@Component({
  selector: 'app-announcement-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-container.component.html',
  styleUrl: './announcement-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementContainerComponent implements OnInit {
  constructor(
    @Inject(AnnouncementService)
    private announcementService: AnnouncementService
  ) {}
  
    announcementsObject!: Collection<Announcement>;
    announcements!: Announcement[];

  announcementsListConfig = {
    initialIndex: 0,
    itemsPerPage: 4,
    contentLimit: 50, // Characters
  };

  pageIndex: number = this.announcementsListConfig.initialIndex;
  size: number = this.announcementsListConfig.itemsPerPage;
  contentLimit: number = this.announcementsListConfig.contentLimit;
  currentPage: number = this.announcementsListConfig.initialIndex;

  ngOnInit() {
    this.loadAnnouncements(this.pageIndex);
    this.onNextPage();
  }
  loadAnnouncements(pageIndex: number) {
    this.announcementsObject = this.announcementService.getAll(
      pageIndex,
      this.size
    );
    this.announcements = this.announcementsObject.items;
    this.currentPage = this.announcementsObject.index;
  }

  onNextPage() {
    if (this.announcementsObject.hasNext) {
      this.pageIndex++;
      this.loadAnnouncements(this.pageIndex);
    }
  }

  onPreviousPage() {
    if (this.announcementsObject.hasPrevious) {
      this.pageIndex--;
      this.loadAnnouncements(this.pageIndex);
    }
  }
}
