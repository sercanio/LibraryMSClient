import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { BackendService } from '~core/services/backend/backend.service';
import { Announcement } from '~models/Announcement';
import { Collection } from '~core/models/Response/Collection';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  announcements: Announcement[] = [];

  constructor(@Inject(BackendService) private backendService: BackendService) {}

  getAll(pageIndex: number, size: number): Observable<Announcement[]> {
    this.backendService
      .getAll<Announcement>(
        `Announcements?PageIndex=${pageIndex}&PageSize=${size}`
      )
      .subscribe((announcements: Collection<Announcement>) => {
        console.log('Announcements:', announcements);
        console.log(`Announcements?PageIndex=${pageIndex}&PageSize=${size}`);

        this.announcements = [];
        if (Array.isArray(announcements.items)) {
          this.announcements.push(...announcements.items);
        } else {
          console.error('items is not an array:', announcements.items);
        }
      });
    return of(this.announcements);
  }


  getById(id: string) {
    this.backendService
      .getSingle<Announcement>('Announcements', id)
      .subscribe((announcement: Announcement) => {
        console.log(announcement);
      });
  }
}
