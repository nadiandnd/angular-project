import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchItem: string): unknown {
    if (!items) {
      return [];
    }
    if (!searchItem) {
      return items;
    }
    searchItem = searchItem.toLocaleLowerCase();
    let filtered = items.filter((e) =>
      e.name.toLocaleLowerCase.includes(searchItem)
    );
    if (filtered.length === 0) return [{ name: null }];

    return filtered;
  }
}
