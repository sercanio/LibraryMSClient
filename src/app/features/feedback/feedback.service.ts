import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '~app/core/services/backend/backend.service';


@Injectable({
  providedIn: 'root',
})
export class FeedBackService {
  constructor(private backendService: BackendService) {}

  sendFeedBack(feedback: FormData): Observable<any> {
    return this.backendService.postFormData(`FeedBacks`, feedback);
  }
}
