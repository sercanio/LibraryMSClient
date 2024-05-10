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
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '~app/shared/services/member/member.service';
import { MemberResponse } from '~app/models/HttpResponse/MemberResponse';
import { PageService } from '~app/core/services/page/page.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileLoaderService } from '~app/core/services/loading/profile-loader/profile-loader.service';
import { SpinnerComponent } from '~app/core/components/spinner/spinner.component';
import { AvatarLoaderService } from '~app/core/services/loading/avatar-loader/avatar-loader-service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
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
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]],
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
  });

  public member: any;
  public memberSettings: any = {};
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';
  public avatar = '';
  public loadingText = 'Updating profile...';

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private pageService: PageService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    protected profileLoaderService: ProfileLoaderService,
    protected avatarLoaderService: AvatarLoaderService
  ) {
    this.authService.userSubject.subscribe((member: MemberResponse) => {
      if (member) {
        this.member = member;
        this.firstName = member.firstName;
        this.lastName = member.lastName;
        this.email = member.email;
        this.phone = member.phoneNumber;
        this.memberSettings = { ...member.memberSetting };
        this.avatar = member.imageUrl;
        this.profileForm.patchValue({
          theme: this.memberSettings.uiTheme,
          language: this.memberSettings.language,
        });
      }
    });
    avatarLoaderService.avatarBeingUpdated = false;
  }

  get f() {
    return this.profileForm.controls;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.patchValue({
        fileSource: file,
      });
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<any>) => {
        this.authService.userSubject.subscribe((member: MemberResponse) => {
          this.avatar = e.target.result || member.imageUrl;
        });
      };
      reader.readAsDataURL(file);
    }
  }

  public saveProfile(event: Event): void {
    this.profileLoaderService.profileBeingUpdated = true;
    this.avatarLoaderService.avatarBeingUpdated = true;
    const formData = new FormData();
    const fileSource = this.profileForm.get('fileSource')?.value;
    if (fileSource) {
      formData.append('file', fileSource);
      formData.append('id', this.authService.userSubject.value.id);
      formData.append(
        'firstName',
        this.authService.userSubject.value.firstName
      );
      formData.append('lastName', this.authService.userSubject.value.lastName);
      formData.append('phoneNumber', this.authService.userSubject.value.phoneNumber);
    }
    this.memberService
      .updateMemberSettings({
        uiTheme: this.profileForm.get('theme')?.value,
        language: this.profileForm.get('language')?.value,
      })
      .subscribe((response) => {
        this.pageService.setTheme(response.uiTheme);
        this.pageService.setLanguage(response.language.split('-')[0]);
        this.toasterService.success('User settings updated successfully');
        this.profileLoaderService.profileBeingUpdated = false;
      });

    this.memberService.changeAvatar(formData).subscribe((response) => {
      this.avatar = response.imageUrl;
      this.toasterService.success('Profile picture updated successfully');
      this.avatarLoaderService.avatarBeingUpdated = false;
    });
  }
}
