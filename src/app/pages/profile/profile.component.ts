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
import { MemberResponse } from '~app/models/HttpResponse/MemberResponse';
import { PageService } from '~app/core/services/page/page.service';

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

  public member: any;
  public memberSettings: any = {};
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private pageService: PageService,
    private formBuilder: FormBuilder
  ) {
    this.authService.userSubject.subscribe((member: MemberResponse) => {
      if (member) {
        this.member = member;
        this.firstName = member.firstName;
        this.lastName = member.lastName;
        this.email = member.email;
        this.phone = member.phoneNumber;
        this.memberSettings = { ...member.memberSetting };
        this.profileForm.patchValue({
          theme: this.memberSettings.uiTheme,
          language: this.memberSettings.language,
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
        this.pageService.setTheme(response.uiTheme);
        this.pageService.setLanguage(response.language);
      });
  }
}
