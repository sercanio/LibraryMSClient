import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { SignupLoaderService } from '~app/core/services/loading/signup-loading/signup-loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  isLoading: boolean = false;
  constructor(public loader: SignupLoaderService) {
  }
}
