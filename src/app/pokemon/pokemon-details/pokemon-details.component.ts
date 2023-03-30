import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokeApiService } from '../../shared/services/poke.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  pokemon: Pokemon;
  pokemonImageUrl: string;
  @ViewChild('pokemonImage') imgElement!: ElementRef;

  constructor(private router: ActivatedRoute, private poke: PokeApiService) {
    this.pokemon = this.router.snapshot.data['pokemon'];
    this.pokemonImageUrl = this.poke.getPokemonImgUrlFromAssets(
      this.pokemon.pokedex_number
    );

    console.log(this.pokemonImageUrl);

    console.log(
      'Checking Pokemon with National ID: ',
      this.pokemon.pokedex_number
    );
  }
}
