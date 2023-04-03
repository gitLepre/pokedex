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
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Pokemon | void> {
    const id = Number(route.paramMap.get('id'));

    await new Promise((resolve) =>
      setTimeout(resolve, 250 + Math.random() * 1000)
    );

    if (!id || isNaN(id) || id < 1 || id > 898) {
      this.redirect();
      return Promise.resolve();
    }

    const pokemon = this.poke.getPokemon(id);
    if (!pokemon) {
      this.redirect();
      return Promise.resolve();
    }

    return Promise.resolve(pokemon);
  }

  redirect() {
    this.snack.error('Pokemon not found', 'OK');
    this.router.navigate(['/']);
  }
}
