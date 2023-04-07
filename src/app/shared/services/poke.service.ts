import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { POKEDEX } from '../pokedata/pokedex';
import { POKEMON_TYPES } from '../pokedata/types';
import { POKEMON_GENERATIONS } from '../pokedata/generations';
import { Pokemon } from '../models/pokemon.model';
import { PkmnBaseStats } from '../models/pokemon-base-stats.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  // Split between mega, galarian, alolan, and standard pokemons
  megaPokemons = POKEDEX.filter((p) => p.name.includes('Mega '));
  alolanPokemons = POKEDEX.filter((p) => p.name.includes('Alolan '));
  galarianPokemons = POKEDEX.filter((p) => p.name.includes('Galarian '));

  pokemons = POKEDEX.filter(
    (pokemon) =>
      !pokemon.name.includes('Mega ') &&
      !pokemon.name.includes('Galarian ') &&
      !pokemon.name.includes('Alolan ') &&
      !pokemon.name.includes('Gmax ') &&
      !pokemon.name.includes('Shadow ')
  );

  types = POKEMON_TYPES;
  generations = POKEMON_GENERATIONS;
  lastPokemonIndex = 898;

  baseStatsMap = new Map<
    PkmnBaseStats,
    { label: string; avg: number; max: number }
  >();

  pokemonStatuses = new Set<string>();

  constructor() {
    this.pokemons.forEach((pokemon) => {
      const status = pokemon.status;
      if (status) {
        this.pokemonStatuses.add(status);
      }
    });
    console.log(this.pokemonStatuses);
  }

  getPokemon(id: number): Pokemon | undefined {
    if (!id || isNaN(id) || id < 1 || id > this.lastPokemonIndex) {
      return;
    }
    return this.pokemons.find((pokemon) => pokemon.pokedex_number === id);
  }

  getPokemonImgUrlFromAssets(pokemonIndex: string | number) {
    return `assets/images/pokemons/${this.pad('' + pokemonIndex)}.png`;
  }

  getPokemonImgUrl(pokemonIndex: string | number) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.pad(
      '' + pokemonIndex
    )}.png`;
  }

  getPokemonImgUrlOld(pokemonIndex: string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
  }

  computePokemonStats() {
    let stats = {
      maxHp: 0,
      maxAttack: 0,
      maxDefense: 0,
      maxSpAttack: 0,
      maxSpDefense: 0,
      maxSpeed: 0,
      avgHP: 0,
      avgAttack: 0,
      avgDefense: 0,
      avgSpAttack: 0,
      avgSpDefense: 0,
      avgSpeed: 0,
    };
    this.pokemons.forEach((pokemon) => {
      stats.maxHp = Math.max(stats.maxHp, pokemon?.hp || 0);
      stats.maxAttack = Math.max(stats.maxAttack, pokemon?.attack || 0);
      stats.maxDefense = Math.max(stats.maxDefense, pokemon?.defense || 0);
      stats.maxSpAttack = Math.max(stats.maxSpAttack, pokemon?.sp_attack || 0);
      stats.maxSpDefense = Math.max(
        stats.maxSpDefense,
        pokemon?.sp_defense || 0
      );
      stats.maxSpeed = Math.max(stats.maxSpeed, pokemon?.speed || 0);
      stats.avgHP += pokemon?.hp || 0;
      stats.avgAttack += pokemon?.attack || 0;
      stats.avgDefense += pokemon?.defense || 0;
      stats.avgSpAttack += pokemon?.sp_attack || 0;
      stats.avgSpDefense += pokemon?.sp_defense || 0;
      stats.avgSpeed += pokemon?.speed || 0;
    });
    stats.avgHP = Math.floor(stats.avgHP / this.pokemons.length);
    stats.avgAttack = Math.floor(stats.avgAttack / this.pokemons.length);
    stats.avgDefense = Math.floor(stats.avgDefense / this.pokemons.length);
    stats.avgSpAttack = Math.floor(stats.avgSpAttack / this.pokemons.length);
    stats.avgSpDefense = Math.floor(stats.avgSpDefense / this.pokemons.length);
    stats.avgSpeed = Math.floor(stats.avgSpeed / this.pokemons.length);

    this.baseStatsMap.set('hp', {
      label: 'HP',
      avg: stats.avgHP,
      max: stats.maxHp,
    });
    this.baseStatsMap.set('attack', {
      label: 'Attack',
      avg: stats.avgAttack,
      max: stats.maxAttack,
    });
    this.baseStatsMap.set('defense', {
      label: 'Defense',
      avg: stats.avgDefense,
      max: stats.maxDefense,
    });
    this.baseStatsMap.set('sp_attack', {
      label: 'Sp. Attack',
      avg: stats.avgSpAttack,
      max: stats.maxSpAttack,
    });
    this.baseStatsMap.set('sp_defense', {
      label: 'Sp. Defense',
      avg: stats.avgSpDefense,
      max: stats.maxSpDefense,
    });
    this.baseStatsMap.set('speed', {
      label: 'Speed',
      avg: stats.avgSpeed,
      max: stats.maxSpeed,
    });
  }

  pad(num: string, size: number = 3) {
    while (num.length < size) num = '0' + num;
    return num;
  }
}
