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

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  viewProviders: [provideIcons({ radixEyeClosed, radixEyeOpen })],
})
export class SignupComponent {
  signupForm: any = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^\\+[0-9]*$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    },
  );

  passwordVisibility: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordMatch() {
    return this.signupForm.get('passwordMatch');
  }

  get isPasswordVisible() {
    return this.passwordVisibility ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.signupForm.value);
  }
}
