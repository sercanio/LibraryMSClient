import { Routes } from '@angular/router';
import { HomeComponent } from '~pages/home/home.component';
import { AboutComponent } from '~pages/about/about.component';
import { ContactComponent } from '~pages/contact/contact.component';
import { AnnouncementDetailComponent } from './pages/announcement-detail/announcement-detail.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'announcements/:id', component: AnnouncementDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
];
