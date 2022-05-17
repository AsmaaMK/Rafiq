import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    if (items.length === 0) return items;

    term = term.toLowerCase();

    return items.filter((item) => {
      const lowerItem = item.toLowerCase();
      return lowerItem.indexOf(term) === 0;
    });
  }
}
