import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightBold',
})
export class HighlightBoldPipe implements PipeTransform {
  transform(text: string, searchItem: string): string {
    const pattern = searchItem
      .replace(/[\-\[\]\/\{\}\*\+\?\.|\\^\$\|]/g, '\\$&')
      .split(' ')
      .filter((e) => e.length > 0)
      .join('|');

    const regex = new RegExp(pattern, 'gi');
    return searchItem
      ? text.replace(regex, (match) => `<b>${match}</b>`)
      : text;
  }
}
//<span [innerHTML]="option.name | highlight: toHighlight"></span>
