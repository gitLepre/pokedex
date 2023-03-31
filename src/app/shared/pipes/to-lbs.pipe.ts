import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Pipe({
  name: 'toFeet',
  standalone: true,
  pure: true,
})
export class ConvertToLbsPipe implements PipeTransform {
  // convert a pokemon's weight from KiloGram to libra, with 2 decimals
  transform(pokemon: Pokemon) {
    const weight = pokemon?.weight_kg;
    if (typeof weight === 'number') {
      return (weight * 2.20462).toFixed(2) + ' lbs';
    }
    return weight;
  }
}
