import { Component } from '@angular/core';
import { PokedexFiltersComponent } from './filters/pokedex-filters.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PokeApiService } from 'src/app/shared/services/poke.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokedex',
  standalone: true,
  templateUrl: './pokedex.component.html',
  styles: [],
  imports: [
    PokedexFiltersComponent,
    RouterLink,
    MatButtonModule,
    CommonModule,
    PokemonCardComponent,
  ],
})
export class PokedexComponent {
  title = 'Pokèdex';
  pokemons = this.poke.pokemons;

  constructor(private poke: PokeApiService) {}
}
