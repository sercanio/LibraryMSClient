import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnnouncementContainerComponent } from '~app/features/announcement/components/announcement-container/announcement-container.component';

@Component({
  standalone: true,
  imports: [AnnouncementContainerComponent, RouterModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
})
export class AnnouncementsComponent {}
