import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnnouncementService } from '~app/features/announcement/services/announcement.service';
import { Announcement } from '~app/models/Announcement';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAnnouncement,
  matEvent,
  matNewspaper,
  matArrowRightAlt,
} from '@ng-icons/material-icons/baseline';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss'],
  imports: [CommonModule, NgIconComponent, RouterModule],
  viewProviders: [
    provideIcons({ matAnnouncement, matEvent, matNewspaper, matArrowRightAlt }),
  ],
})
export class AnnouncementDetailComponent implements OnInit {
  announcementId!: string;
  announcement!: Announcement;
  announcementTitle!: string;
  announcementContent!: string;
  announcementTag!: number;
  announcementDate!: Date;

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.announcementId = params['id'];
    });
    this.loadAnnouncementDetails();
  }

  loadAnnouncementDetails() {
    this.announcementService
      .getById(this.announcementId)
      .subscribe((response: Announcement) => {
        if (response) {
          this.announcement = response;
          this.announcementTitle = response.title;
          this.announcementContent = response.content;
          this.announcementTag = response.tag;
          this.announcementDate = response.createdDate;
        }
      });
  }
}
