import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Pipe({
  name: 'getTypeIcon',
  standalone: true,
  pure: true,
})
export class GetTypeIconPipe implements PipeTransform {
  // Get a pokemon type as string and return the url of the icon svg
  transform(type: string | undefined) {
    if (!type) return '';
    return `assets/images/types/${type.toLowerCase()}.svg`;
  }
}
