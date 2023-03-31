import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { of } from 'rxjs';

@Pipe({
  name: 'getHeight',
  standalone: true,
  pure: true,
})
export class GetPokemonHeightPipe implements PipeTransform {
  // return pokemon height in meters
  transform(pokemon: Pokemon) {
    const height = pokemon?.height_m;
    if (typeof height === 'number') {
      return height.toString() + ' m';
    }
    return height;
  }
}
