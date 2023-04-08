import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokeApiService } from 'src/app/shared/services/poke.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonSpecies } from 'pokedex-promise-v2';
import { ReplaySubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.scss'],
  imports: [CommonModule, MatIconModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvolutionsComponent {
  @Input() species$!: ReplaySubject<PokemonSpecies>;
  pokemon: Pokemon;
  pokemons = this.poke.pokemons;

  evolutions: any[] = [];

  constructor(
    private poke: PokeApiService,
    private ar: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.pokemon = this.ar.snapshot.data['pokemon'];
  }

  ngOnInit() {
    if (this.species$) {
      this.species$.subscribe((res) => {
        const speciesSplit = (res.evolution_chain?.url.split('/') ||
          []) as string[];
        const evolutionChainId = +speciesSplit[speciesSplit.length - 2];
        return this.poke.getEvolutionChain(evolutionChainId).then((res) => {
          const main = res.chain.species.name;
          const evoChain = [this.fromNameToEvoItem(main)];
          while (res.chain.evolves_to.length > 0) {
            res.chain = res.chain.evolves_to[0];
            evoChain.push(this.fromNameToEvoItem(res.chain.species.name));
          }
          this.evolutions = evoChain;

          this.cdRef.detectChanges();
        });
      });
    }
  }

  fromNameToEvoItem(name: string) {
    const id = this.poke.getPokemonidByName(name);
    return {
      name,
      id,
      image: this.poke.getPokemonImgUrlFromAssets(id),
    };
  }
}
