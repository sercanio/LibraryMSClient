import { Injectable } from '@angular/core';
import { AuthService } from '~app/core/services/auth/auth.service';
import { BackendService } from '~app/core/services/backend/backend.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(
    private authService: AuthService,
    private backendService: BackendService
  ) {}

  getMemberSettingsId() {
    return this.authService.userSubject.value.memberSetting.id;
  }

  updateMemberSettings(settings: any) {
    settings = { ...settings, id: this.getMemberSettingsId() };    
    return this.backendService.put<any, any>('MemberSettings', settings);
  }
}
