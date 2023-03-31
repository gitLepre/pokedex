import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { of } from 'rxjs';

@Pipe({
  name: 'getWeight',
  standalone: true,
  pure: true,
})
export class GetPokemonWeightPipe implements PipeTransform {
  // return pokemon weight in kg
  transform(pokemon: Pokemon) {
    const height = pokemon?.weight_kg;
    if (typeof height === 'number') {
      return height.toString() + ' kg';
    }
    return height;
  }
}
