import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Pipe({
  name: 'getTypes',
  standalone: true,
  pure: true,
})
export class GetPokemonTypesPipe implements PipeTransform {
  transform(pokemon: Pokemon) {
    const types = [pokemon?.type_1, pokemon?.type_2].filter(
      (t) => typeof t === 'string'
    );
    return types;
  }
}
