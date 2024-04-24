import { Pipe, PipeTransform } from '@angular/core';
import { BookStatus, BookStatusEnum } from '~app/models/BookStatus';

@Pipe({
  name: 'bookStatus',
  standalone: true,
})
export class BookStatusPipe implements PipeTransform {
  transform(value: BookStatusEnum): string {
    let text: BookStatus;

    switch (value) {
      case 0:
        text = 'Unavailable';
        break;
      case 1:
        text = 'Available';
        break;
      case 2:
        text = 'Reserved';
        break;
      default:
        text = 'Borrowed';
        break;
    }
    return text;
  }
}
