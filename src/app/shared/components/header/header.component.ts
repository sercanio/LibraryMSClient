import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherFacebook } from '@ng-icons/feather-icons';
import { bootstrapTwitterX } from '@ng-icons/bootstrap-icons';
import { AuthService } from '~app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  viewProviders: [provideIcons({ featherFacebook, bootstrapTwitterX })],
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  user: any;
  userEmail: string = '';
  @Input() isAuthenticated: boolean = false;
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId))
      this.user = this.authService.getUserFromAuth().subscribe((user: any) => {
        this.user = user;
        this.userEmail = user.email;
        this.isAuthenticated = true;
      });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logOut() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
