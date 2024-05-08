import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '~shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageService } from './core/services/page/page.service';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Tobeto Public Library';
  metaDescription = '';

  constructor(
    private pageService: PageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userSubject.subscribe((user) => {
      if (user) {
        this.pageService.setTheme(user.memberSetting.uiTheme);
        this.pageService.setLanguage(user.memberSetting.language);
      } else {
        this.pageService.setTheme();
      }
    });
  }
}
