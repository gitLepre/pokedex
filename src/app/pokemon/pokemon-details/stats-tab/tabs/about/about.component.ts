import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { GetPokemonHeightPipe } from 'src/app/shared/pipes/get-height.pipe';
import { GetPokemonWeightPipe } from 'src/app/shared/pipes/get-weigth.pipe';
import { ConvertToFeetPipe } from 'src/app/shared/pipes/to-feet.pipe';
import { ConvertToLbsPipe } from 'src/app/shared/pipes/to-lbs.pipe';
import { GetPokemonAbilitiesPipe } from 'src/app/shared/pipes/get-abilities.pipe';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/shared/services/poke.service';

@Component({
  standalone: true,
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [
    NgIf,
    NgFor,
    GetPokemonHeightPipe,
    GetPokemonWeightPipe,
    ConvertToFeetPipe,
    ConvertToLbsPipe,
    GetPokemonAbilitiesPipe,
  ],
})
export class AboutComponent {
  pokemon: Pokemon;

  constructor(private router: ActivatedRoute, private poke: PokeApiService) {
    this.pokemon = this.router.snapshot.data['pokemon'];
  }
}
