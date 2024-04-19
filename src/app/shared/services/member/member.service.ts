import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '~app/core/services/auth/auth.service';
import { BackendService } from '~app/core/services/backend/backend.service';
import { MemberSetting } from '~app/models/HttpResponse/MemberResponse';

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

  updateMemberSettings(settings: any) : Observable<MemberSetting> {
    settings = { ...settings, id: this.getMemberSettingsId() };    
    return this.backendService.put<MemberSetting, MemberSetting>('MemberSettings', settings);
  }
}
