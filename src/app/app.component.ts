import { Component, Inject, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '~shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tobeto Public Library';
  metaDescription = '';
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated;
  }
  
}
