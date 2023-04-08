import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { POKEMON_GENERATIONS } from '../pokedata/generations';

@Pipe({
  name: 'getGeneration',
  standalone: true,
  pure: true,
})
export class GetGenerationPipe implements PipeTransform {
  transform(pokemon: Pokemon) {
    const generation = pokemon?.generation || null;
    if (generation) {
      const generationName =
        POKEMON_GENERATIONS.find((gen) => gen.value === '' + generation)
          ?.viewValue || 'Unknown';
      return generationName;
    }
    return 'Unknown';
  }
}
