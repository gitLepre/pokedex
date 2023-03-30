import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { POKEDEX } from '../pokedata/pokedex';
import { POKEMON_TYPES } from '../pokedata/types';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  pokemons = POKEDEX;
  types = POKEMON_TYPES;
  lastPokemonIndex = 898;

  getPokemon(id: number): Pokemon | undefined {
    if (!id || isNaN(id) || id < 1 || id > this.lastPokemonIndex) {
      return;
    }
    return this.pokemons.find((pokemon) => pokemon.pokedex_number === id);
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
