import { Inject, Injectable } from '@angular/core';
import { BackendService } from '~core/services/backend/backend.service';
import { Announcement } from '~models/Announcement';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(@Inject(BackendService) private backendService: BackendService) {}
  announcements!: any;
  getAll(pageIndex: number, size: number): any {
    this.backendService
      .getAll<Announcement>(
        `Announcements?PageIndex=${pageIndex}&PageSize=${size}`
      )
      .subscribe((announcements: any) => {
        console.log('Announcements:', announcements);
        console.log(`Announcements?PageIndex=${pageIndex}&PageSize=${size}`);
        this.announcements = announcements;
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
