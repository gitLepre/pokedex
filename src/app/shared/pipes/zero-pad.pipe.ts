import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad',
  standalone: true,
  pure: true,
})
export class ZeroPadPipe implements PipeTransform {
  transform(value: number | string | undefined): string {
    if (!value) return '0000';
    let paddedValue = value.toString();
    while (paddedValue.length < 4) {
      paddedValue = '0' + paddedValue;
    }
    return paddedValue;
  }
}
