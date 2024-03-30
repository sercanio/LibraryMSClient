import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '~app/core/models/Response/Collection';
import { BackendService } from '~core/services/backend/backend.service';
import { Announcement } from '~models/Announcement';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  
  announcements!: Announcement[];
  announcement!: Announcement;
  
  constructor(@Inject(BackendService) private backendService: BackendService) {}

  getAll(
    pageIndex: number,
    size: number
  ): Observable<Collection<Announcement>> {
    return this.backendService.getAll<Announcement>(
      `Announcements?PageIndex=${pageIndex}&PageSize=${size}`
    );
  }

  getById(id: string): Observable<Announcement> {
    return this.backendService.getSingle<Announcement>('Announcements', id);
  }
}
