import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '~app/core/services/auth/auth.service';
import { LoginResponse } from '~app/models/LoginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() email: string;
  @Input() password: string;

  constructor(private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  login(event: Event) {
    event.preventDefault();
    this.authService.login(this.email, this.password).subscribe(
      (response: LoginResponse) => {
        this.authService.authenticated = true;
        document.cookie = `access_token=${response.accessToken.token}`;
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
