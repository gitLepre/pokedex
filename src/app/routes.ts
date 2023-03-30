import { Route } from '@angular/router';
import { PokemonResolver } from './shared/resolvers/pokemon-resolver';

const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./pokemon/routes').then((m) => m.POKEDEX_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export { APP_ROUTES };
