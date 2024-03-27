import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  standalone: true,
})
export class PaginationPipe implements PipeTransform {
  transform(value: any[], page: any): any {
    console.log(value, page, ...value.slice(3 * (page - 1), 3 * page));
    return [...value.slice(3 * page, 3 * (page + 1))];
  }
}
