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

  getPokemonList(page: number = 0): Observable<any> {
    if (page < 0) return of(null);

    const url = 'https://pokeapi.co/api/v2/pokemon';
    let params = new HttpParams();
    params = params.append('limit', 12);
    params = params.append('offset', page * 12);
    return this.http.get<any>(url, { params: params });
  }

  getPokemonImgUrl(pokemonIndex: string) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
  }
}
