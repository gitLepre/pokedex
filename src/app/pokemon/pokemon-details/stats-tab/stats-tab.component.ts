import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/shared/services/poke.service';
import { AboutComponent } from './tabs/about/about.component';
import { BaseStatsComponent } from './tabs/base-stats/base-stats.component';
import { EvolutionsComponent } from './tabs/evolutions/evolutions.component';
import { PokemonSpecies } from 'pokedex-promise-v2';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'stats-tab',
  standalone: true,
  imports: [
    MatTabsModule,
    AboutComponent,
    BaseStatsComponent,
    EvolutionsComponent,
  ],
  templateUrl: './stats-tab.component.html',
  styleUrls: ['./stats-tab.component.scss'],
})
export class StatsTabComponent {
  species$ = new ReplaySubject<PokemonSpecies>(1);
  pokemon: Pokemon;

  constructor(private router: ActivatedRoute, private poke: PokeApiService) {
    this.pokemon = this.router.snapshot.data['pokemon'];
    this.poke.getPokemonSpecies(this.pokemon).then((res) => {
      this.species$.next(res);
    });
  }
}
