import { Component } from '@angular/core';
import { PokedexFiltersComponent } from './filters/pokedex-filters.component';

@Component({
  selector: 'pokedex',
  standalone: true,
  templateUrl: './pokedex.component.html',
  styles: [],
  imports: [PokedexFiltersComponent],
})
export class PokedexComponent {
  title = 'Pokèdex';
}
