import { Directive, HostListener, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appCopyToClipboard]',
  standalone: true,
})
export class CopyToClipboardDirective {
  @Input('appCopyToClipboard') isbn: string = '';

  constructor(private toasterService: ToastrService) {}

  @HostListener('click') onClick() {
    navigator.clipboard
      .writeText(this.isbn)
      .then(() => {
        this.toasterService.success('Copied to clipboard', this.isbn);
      })
      .catch((error) => {
        this.toasterService.error('Error copying to clipboard', error);
      });
  }
}
