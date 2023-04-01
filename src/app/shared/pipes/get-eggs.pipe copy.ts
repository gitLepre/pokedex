import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { of } from 'rxjs';

@Pipe({
  name: 'getEggGroups',
  standalone: true,
  pure: true,
})
export class GetEggGroupsPipe implements PipeTransform {
  transform(pokemon: Pokemon) {
    const eggGroups = pokemon?.egg_type_1 ? [pokemon.egg_type_1] : [];
    if (pokemon?.egg_type_2) eggGroups.push(pokemon.egg_type_2);

    return eggGroups.length > 0 ? eggGroups.join(', ') : 'No Egg Groups';
  }
}
