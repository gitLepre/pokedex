import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'stats-tab',
  standalone: true,
  imports: [MatTabsModule, NgIf, NgFor],
  templateUrl: './stats-tab.component.html',
  styleUrls: ['./stats-tab.component.scss'],
})
export class StatsTabComponent {
  pokemon: Pokemon;

  constructor(private router: ActivatedRoute, private poke: PokeApiService) {
    this.pokemon = this.router.snapshot.data['pokemon'];
  }
}
