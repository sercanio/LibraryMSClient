
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'iconGenerator',
  standalone: true
})
export class IconGeneratorPipe implements PipeTransform {

  transform(value: number): string {
    let icon: string;

    switch (value) {
      case 0:
        icon = '';
        break;
      case 1:
        icon = 'event-icon';
        break;
      case 2:
        icon = 'news-icon';
        break;
      default:
        icon = 'unknown-icon';
        break;
    }
    return icon;
  }
}
