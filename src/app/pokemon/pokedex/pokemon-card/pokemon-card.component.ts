import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokeApiService } from 'src/app/shared/services/poke.service';
import { RouterLink } from '@angular/router';

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

  getPokemonImage() {
    return this.poke.getPokemonImgUrlFromAssets(this.pokemon.pokedex_number);
  }
}
