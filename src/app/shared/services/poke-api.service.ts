import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokedex, { NamedAPIResourceList } from 'pokedex-promise-v2';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  api: Pokedex = new Pokedex();

  private pokemons$: ReplaySubject<NamedAPIResourceList> =
    new ReplaySubject<NamedAPIResourceList>(1);

  constructor() {
    console.log(
      '%cPackage used:\n https://github.com/PokeAPI/pokedex-promise-v2',
      'color: green; background-color: LightGreen; padding: 8px;'
    );

    this.api.getPokemonsList().then((ps) => {
      this.pokemons$.next(ps);
    });
  }

  getPokemons() {
    return this.pokemons$;
  }

  getPokemon(id: number | string) {
    if ((typeof id === 'number' && id < 0) || id > 1279)
      return Promise.resolve();

    return this.api.getPokemonByName(id);
  }

  getPokemonImgUrl(pokemonIndex: string) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.pad(
      pokemonIndex
    )}.png`;
  }

  getPokemonImgUrlOld(pokemonIndex: string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
  }

  pad(num: string, size: number = 3) {
    while (num.length < size) num = '0' + num;
    return num;
  }
}
