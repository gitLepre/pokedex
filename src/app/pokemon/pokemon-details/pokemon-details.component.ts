import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../shared/models/pokemon.model';

@Component({
  standalone: true,
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent {
  pokemon: Pokemon;

  constructor(private router: ActivatedRoute) {
    this.pokemon = this.router.snapshot.data['pokemon'];
    console.log(
      'Checking Pokemon with National ID: ',
      this.pokemon.pokedex_number
    );
  }
}
