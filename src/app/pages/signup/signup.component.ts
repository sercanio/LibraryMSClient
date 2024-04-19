import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixEyeClosed, radixEyeOpen } from '@ng-icons/radix-icons';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { AuthService } from '~app/core/services/auth/auth.service';
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  viewProviders: [provideIcons({ radixEyeClosed, radixEyeOpen })],
})
export class SignupComponent {
  signupForm: any = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^\\+[0-9]*$')]],
    dateOfBirth: ['', [Validators.required, this.ageValidator(7)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  passwordVisibility: boolean = false;
  loadingText!: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public httpErrorService: HttpErrorService
  ) {
    this.loadingText = 'Signing up...';
  }

  get firstName(): AbstractControl<string | null> | null {
    return this.signupForm.get('firstName');
  }

  get lastName(): AbstractControl<string | null> | null {
    return this.signupForm.get('lastName');
  }

  get phoneNumber(): AbstractControl<string | null> | null {
    return this.signupForm.get('phoneNumber');
  }

  get email(): AbstractControl<string | null> | null {
    return this.signupForm.get('email');
  }

  get dateOfBirth(): AbstractControl<string | null> | null {
    return this.signupForm.get('dateOfBirth');
  }

  get password(): AbstractControl<string | null> | null {
    return this.signupForm.get('password');
  }

  get isPasswordVisible(): string {
    return this.passwordVisibility ? 'text' : 'password';
  }

  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const birthDate = new Date(control.value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      if (age < minAge) {
        return { ageTooYoung: true };
      }
      return null;
    };
  }

  togglePasswordVisibility() : void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  onSubmit(event: Event) {
    console.log(this.signupForm.value);
    this.authService.register({ subscribe: true, ...this.signupForm.value });
  }
}
