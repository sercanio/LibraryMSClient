import { Routes } from '@angular/router';
import { HomeComponent } from '~pages/home/home.component';
import { AboutComponent } from '~pages/about/about.component';
import { ContactComponent } from '~pages/contact/contact.component';
import { AnnouncementDetailComponent } from './pages/announcement-detail/announcement-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'announcements/:id', component: AnnouncementDetailComponent }
];
