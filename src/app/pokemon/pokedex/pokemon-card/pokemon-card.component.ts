import { Component, HostBinding, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokeApiService } from 'src/app/shared/services/poke.service';
import { RouterLink } from '@angular/router';

const TYPE_COLORS: any = {
  bug: '#92bc2c',
  dark: '#595761',
  dragon: '#0c69c8',
  electric: '#f2d94e',
  fairy: '#fba54c',
  fighting: '#ee90e6',
  fire: '#d3425f',
  flying: '#a1bbec',
  ghost: '#5f6dbc',
  grass: '#5fbd58',
  ground: '#da7c4d',
  ice: '#75d0c1',
  normal: '#a0a29f',
  poison: '#b763cf',
  psychic: '#fa8581',
  rock: '#c9bb8a',
  steel: '#5695a3',
  water: '#539ddf',
};

@Component({
  standalone: true,
  selector: 'pokemon-card[pokemon]',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  constructor(private poke: PokeApiService) {}

  ngOnInit() {
    this.setBgColor();
  }

  @HostBinding('style.background-color') bgColor = 'white';

  getPokemonImage() {
    return this.poke.getPokemonImgUrlFromAssets(this.pokemon.pokedex_number);
  }

  pad(num: string | number, size: number = 4) {
    while (('' + num).length < size) num = '0' + num;
    return num;
  }

  setBgColor() {
    // Blend the type_1 and type_2 color of the pokemon, combining the r g and b values and setting the opacity to 0.5

    const type1 = (this.pokemon?.type_1 || '').toLowerCase();
    const type2 = (this.pokemon?.type_2 || '')?.toLowerCase();

    if (!type1) this.bgColor = `white`;
    if (!type2) this.bgColor = TYPE_COLORS[type1] + '66';
    else {
      this.bgColor = TYPE_COLORS[type1] + '55'; // const type1Color = TYPE_COLORS[type1];
      // const type2Color = TYPE_COLORS[type2];

      // const r = Math.round(
      //   (parseInt(type1Color.substr(1, 2), 16) +
      //     parseInt(type2Color.substr(1, 2), 16)) /
      //     2
      // );
      // const g = Math.round(
      //   (parseInt(type1Color.substr(3, 2), 16) +
      //     parseInt(type2Color.substr(3, 2), 16)) /
      //     2
      // );
      // const b = Math.round(
      //   (parseInt(type1Color.substr(5, 2), 16) +
      //     parseInt(type2Color.substr(5, 2), 16)) /
      //     2
      // );

      // Convert to hex with 0.4 opacity
      // this.bgColor = `rgba(${r}, ${g}, ${b}, 0.8)`;

      // set the host element's background color to the new color
    }
  }
}
