import { Component, Inject } from '@angular/core';
import { BackendService } from '../../../../core/services/backend/backend.service';
import { Announcement } from '../../../../models/Announcement';
import { Collection } from '../../../../core/models/Response/Collection';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-container.component.html',
  styleUrl: './announcement-container.component.scss',
})
export class AnnouncementContainerComponent {
  announcements: Announcement[] = [];

  constructor(@Inject(BackendService) private backendService: BackendService) {}

  ngOnInit() {
    console.log(this.fetchAnnouncements());
    console.log(this.fetchAnnouncement('E014EFC4-0973-4FC1-80BB-464B4D791173'));
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
