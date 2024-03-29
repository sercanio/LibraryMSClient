import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Announcement } from '~models/Announcement';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '~features/announcement/services/announcement.service';

@Component({
  selector: 'app-announcement-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-container.component.html',
  styleUrl: './announcement-container.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AnnouncementContainerComponent implements OnInit {
  constructor(
    @Inject(AnnouncementService)
    private announcementService: AnnouncementService,
    private cdr: ChangeDetectorRef
  ) {}
  announcements: Announcement[] = [];
  pageIndex: number = 0; // Default page index
  size: number = 4; // Default page size
  isLastPage: boolean = false;

  ngOnInit() {
    this.loadAnnouncements(this.pageIndex);
  }

  loadAnnouncements(pageIndex: number) {
    this.announcementService
      .getAll(pageIndex, this.size)
      .subscribe((announcements) => {
        this.announcements = [...announcements];
        this.isLastPage = announcements.length < this.size;
        this.cdr.detectChanges(); // Trigger change detection after updating announcements
      });
  }

  onPreviousPage() {
    if (this.pageIndex > 0) {
      this.loadAnnouncements(this.pageIndex);
      this.pageIndex--;
    }
  }

  onNextPage() {
    if (!this.isLastPage) {
      this.loadAnnouncements(this.pageIndex);
      this.pageIndex++;
    }
  }
}
