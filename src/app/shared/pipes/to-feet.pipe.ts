import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Pipe({
  name: 'toLbs',
  standalone: true,
  pure: true,
})
export class ConvertToFeetPipe implements PipeTransform {
  // convert a pokemon's heigth from m to ft
  transform(pokemon: Pokemon) {
    const height = pokemon?.height_m;
    if (typeof height === 'number') {
      return (height * 3.28084).toFixed(2) + ' ft';
    }
    return height;
  }
}
