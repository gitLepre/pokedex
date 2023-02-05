import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pokedex from 'pokedex-promise-v2';
import { Observable, of } from 'rxjs';

//

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  api: Pokedex = new Pokedex();

  constructor(private http: HttpClient) {
    console.log(
      '%cPackage used:\n https://github.com/PokeAPI/pokedex-promise-v2',
      'color: green; background-color: LightGreen; padding: 8px;'
    );
  }

  getPokemonList(page: number = 0) {
    if (page < 0) return Promise.resolve();

    const interval = {
      limit: 12,
      offset: page * 12,
    };
    return this.api.getPokemonsList(interval);
  }

  getPokemon(id: number) {
    if (id < 0 || id > 1279) return Promise.resolve();

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
