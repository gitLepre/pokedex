import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../../../shared/models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../../../../shared/services/poke.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PkmnBaseStats } from '../../../../../shared/models/pokemon-base-stats.model';

@Component({
  standalone: true,
  selector: 'base-stats',
  templateUrl: './base-stats.component.html',
  styleUrls: ['./base-stats.component.scss'],
  imports: [CommonModule, MatProgressBarModule],
})
export class BaseStatsComponent {
  pokemon: Pokemon;
  pokemonStats = this.poke.baseStatsMap;

  stats: PkmnBaseStats[] = [
    'hp',
    'speed',
    'attack',
    'sp_attack',
    'defense',
    'sp_defense',
  ];

  constructor(private router: ActivatedRoute, private poke: PokeApiService) {
    this.pokemon = this.router.snapshot.data['pokemon'];
  }

  getStatLabel(stat: PkmnBaseStats): string {
    return this.pokemonStats.get(stat)?.label || '';
  }

  getStatAvg(stat: PkmnBaseStats): number {
    return this.pokemonStats.get(stat)?.avg || 0;
  }

  getStatMax(stat: PkmnBaseStats): number {
    return this.pokemonStats.get(stat)?.max || 0;
  }

  getProgress(stat: PkmnBaseStats): number {
    return ((this.pokemon[stat] || 0) / this.getStatMax(stat)) * 100;
  }

  getProgressClass(stat: PkmnBaseStats): string {
    const progress = this.getProgress(stat);
    if (progress < 40) {
      return 'low';
    } else if (progress < 85) {
      return 'medium';
    } else {
      return 'high';
    }
  }
}
