import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '~app/core/services/loading/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  @Input() spinnerTypes: string[] = [];
  @Input() loadingText!: string;

  constructor(public loader: LoaderService) {}

  shouldShowSpinner(): boolean {
    return this.spinnerTypes.some((type) => this.loader.isLoading(type));
  }
}
