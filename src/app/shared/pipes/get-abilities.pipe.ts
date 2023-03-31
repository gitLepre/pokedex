import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { of } from 'rxjs';

@Pipe({
  name: 'getAbilities',
  standalone: true,
  pure: true,
})
export class GetPokemonAbilitiesPipe implements PipeTransform {
  // return pokemon abilities comma separated or 'No Ability' if no abilities
  transform(pokemon: Pokemon) {
    const abilities = pokemon?.ability_1 ? [pokemon.ability_1] : [];
    if (pokemon?.ability_2) abilities.push(pokemon.ability_2);

    if (pokemon?.ability_hidden) abilities.push(pokemon.ability_hidden);

    return abilities.length > 0 ? abilities.join(', ') : 'No Ability';
  }
}
