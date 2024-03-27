import { Component, Inject } from '@angular/core';
import { Announcement } from '~models/Announcement';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '~features/announcement/services/announcement.service';

@Component({
  selector: 'app-announcement-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-container.component.html',
  styleUrl: './announcement-container.component.scss',
})
export class AnnouncementContainerComponent {
  announcements: Announcement[] = [];

  constructor(@Inject(AnnouncementService) private announcementService: AnnouncementService) {}

  ngOnInit() {
    this.announcements = this.announcementService.getAll();
    console.log(this.announcementService.getById('E014EFC4-0973-4FC1-80BB-464B4D791173'));
  }
}
