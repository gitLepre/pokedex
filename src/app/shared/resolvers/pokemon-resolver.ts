import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PokeApiService } from '../services/poke.service';
import { Pokemon } from '../models/pokemon.model';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonResolver {
  constructor(
    private poke: PokeApiService,
    private router: Router,
    private snack: SnackService
  ) {}

  // Check if id is valid, and if it is get the pokemon from the api and return it
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Pokemon | undefined {
    const id = Number(route.paramMap.get('id'));

    if (!id || isNaN(id) || id < 1 || id > 898) {
      this.redirect();
      return;
    }

    const pokemon = this.poke.getPokemon(id);
    if (!pokemon) {
      this.redirect();
      return;
    }

    return pokemon;
  }

  redirect() {
    this.snack.error('Pokemon not found', 'OK');
    this.router.navigate(['/']);
  }
}
