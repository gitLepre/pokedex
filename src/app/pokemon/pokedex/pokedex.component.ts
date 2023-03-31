import { Component } from '@angular/core';
import { PokedexFiltersComponent } from './filters/pokedex-filters.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pokedex',
  standalone: true,
  templateUrl: './pokedex.component.html',
  styles: [],
  imports: [PokedexFiltersComponent, RouterLink, MatButtonModule],
})
export class PokedexComponent {
  title = 'Pokèdex';
}
