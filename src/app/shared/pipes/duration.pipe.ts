import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(time: string): string {
    if (time === '00:00') {
      return '';
    }
    let [hours, minutes] = time.split(':');
    let durationHour = hours === '0' ? '' : 'hour';
    let durationMin = minutes === '0' ? '' : 'min';
    return durationHour + durationMin;
  }
}
