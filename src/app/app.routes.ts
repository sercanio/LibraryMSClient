import { Routes } from '@angular/router';
import { HomeComponent } from '~pages/home/home.component';
import { AboutComponent } from '~pages/about/about.component';
import { ContactComponent } from '~pages/contact/contact.component';
import { AnnouncementDetailComponent } from './pages/announcement-detail/announcement-detail.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LibraryComponent } from './pages/library/library.component';
import { authGuard } from './core/guards/auth.guard';
import { EBookDetailComponent } from './pages/ebook-detail/ebook-detail.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { MagazineetailComponent } from './pages/magazine-detail/magazine-detail.component';
import { CatalogDetailComponent } from './pages/catalog-detail/catalog-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'announcements/:id', component: AnnouncementDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'library', component: LibraryComponent, canActivate: [authGuard] },
  { path: 'ebook/:id', component: EBookDetailComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'magazine/:id', component: MagazineetailComponent },
  { path: 'catalog/:id', component: CatalogDetailComponent },
];
