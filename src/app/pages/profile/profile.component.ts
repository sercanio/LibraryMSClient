import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '~app/core/services/auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  iconoirMail,
  iconoirPhone,
  iconoirLanguage,
  iconoirSunLight,
} from '@ng-icons/iconoir';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '~app/shared/services/member/member.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  viewProviders: [
    provideIcons({
      iconoirMail,
      iconoirPhone,
      iconoirLanguage,
      iconoirSunLight,
    }),
  ],
})
export class ProfileComponent {
  profileForm = this.formBuilder.group({
    theme: '',
    language: '',
  });

  public user: any;
  public userSettings: any = {};
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private formBuilder: FormBuilder
  ) {
    this.authService.userSubject.subscribe((user) => {
      if (user) {
        this.user = user;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phoneNumber;
        this.userSettings = { ...user.memberSetting };
        this.profileForm.patchValue({
          theme: this.userSettings.uiTheme,
          language: this.userSettings.language,
        });
      }
    });
  }

  public saveProfile(event: Event): void {
    this.memberService
      .updateMemberSettings({
        uiTheme: this.profileForm.get('theme')?.value,
        language: this.profileForm.get('language')?.value,
      })
      .subscribe((response) => {
        console.log('response', response);
      });
  }
}
