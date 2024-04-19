import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '~app/core/services/auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixEyeClosed, radixEyeOpen } from '@ng-icons/radix-icons';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { HttpErrorService } from '~app/core/services/http-error/http-error.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    RouterModule,
    SpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders: [provideIcons({ radixEyeClosed, radixEyeOpen })],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  passwordVisibility = false;
  loadingText!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public httpErrorService: HttpErrorService
  ) {
    this.authService.userSubject.subscribe((user) => {
      if (!!user) {
        this.router.navigateByUrl('/');
      }
    });
    this.loadingText = 'Logging in...';
  }

  get email(): AbstractControl<string | null> | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl<string | null> | null {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  get isPasswordVisible(): string {
    return this.passwordVisibility ? 'text' : 'password';
  }

  onSubmit(event: Event): void {
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }

  resetForm():void {
    this.loginForm.reset();
  }
}
