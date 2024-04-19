import { Component, Inject, OnInit } from '@angular/core';
import { Announcement } from '~models/Announcement';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '~features/announcement/services/announcement.service';
import { Collection } from '~app/core/models/Response/Collection';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAnnouncement,
  matEvent,
  matNewspaper,
  matArrowRightAlt,
} from '@ng-icons/material-icons/baseline';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-announcement-container',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterModule],
  templateUrl: './announcement-container.component.html',
  styleUrl: './announcement-container.component.scss',
  viewProviders: [
    provideIcons({ matAnnouncement, matEvent, matNewspaper, matArrowRightAlt }),
  ],
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
  isLastPage: boolean = false;
  isFirstPage: boolean = false;

  ngOnInit() {
    this.loadAnnouncements(this.pageIndex);
  }

  loadAnnouncements(pageIndex: number): void {
    this.announcementService
      .getAll(this.pageIndex, this.size)
      .subscribe((response: Collection<Announcement>) => {
        if (response && response.items) {
          this.announcementsObject = response;
          this.announcements = response.items;
          this.currentPage = response.index;
          this.isLastPage = !response.hasNext;
          this.isFirstPage = !response.hasPrevious;
        } else {
          this.announcements = [];
        }
      });
  }

  onNextPage(): void {
    if (!this.isLastPage) {
      this.pageIndex++;
      this.loadAnnouncements(this.pageIndex);
    }
  }

  onPreviousPage(): void {
    if (!this.isFirstPage) {
      this.pageIndex--;
      this.loadAnnouncements(this.pageIndex);
    }
  }
}
