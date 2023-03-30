import { Route } from '@angular/router';
import { PokemonResolver } from '../shared/resolvers/pokemon-resolver';

const POKEDEX_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pokedex/pokedex.component').then((m) => m.PokedexComponent),
    pathMatch: 'full',
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pokemon-details/pokemon-details.component').then(
        (m) => m.PokemonDetailsComponent
      ),
    resolve: {
      pokemon: PokemonResolver,
    },
  },
  { path: '**', redirectTo: '' },
];

export { POKEDEX_ROUTES };
