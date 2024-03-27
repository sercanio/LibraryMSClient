import { Inject, Injectable } from '@angular/core';
import { BackendService } from '~core/services/backend/backend.service';
import { Announcement } from '~models/Announcement';
import { Collection } from '~core/models/Response/Collection';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  announcements: Announcement[] = [];
  
  constructor(@Inject(BackendService) private backendService: BackendService) {}
  
  getAll() {
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

  getById(id: string) {
    this.backendService
      .getSingle<Announcement>('Announcements', id)
      .subscribe((announcement: Announcement) => {
        console.log(announcement);
      });
  }
}
