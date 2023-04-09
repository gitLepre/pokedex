import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PokeApiService } from '../../shared/services/poke.service';
import {
  BehaviorSubject,
  debounceTime,
  Subject,
  tap,
  Subscription,
  fromEvent,
} from 'rxjs';
import { SnackService } from 'src/app/shared/services/snack.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokedexFiltersComponent } from './filters/pokedex-filters.component';

@Component({
  standalone: true,
  selector: 'pokedex',
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    RouterModule,
    ScrollingModule,
    PokemonCardComponent,
    PokedexFiltersComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexComponent {
  pokemons = this.poke.pokemons;
  currentPokemons: Pokemon[] = this.poke.pokemons;
  pokemonNames = this.poke.pokemons.map((p) => p.name);

  resizeSubscription!: Subscription;
  resizeBreakpoints = [400, 769, 1201];
  currentBreakpoint: number = this.findCurrentBreakpoint();

  searchSubscription!: Subscription;
  searchText: string = '';
  searchTextUpdate: Subject<string> = new Subject<string>();
  filteredOptions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  filteredOptions = [...this.pokemons];

  debouncing: boolean = false;

  filters: any = {};

  constructor(
    private cdRef: ChangeDetectorRef,
    private poke: PokeApiService,
    private snack: SnackService
  ) {
    this.subscribeToSearchChanges();
    this.subscribeToWindowResize();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
  }

  getPokemonImage(pokemon: string | number) {
    return this.poke.getPokemonImgUrl(pokemon);
  }

  subscribeToSearchChanges() {
    this.searchSubscription = this.searchTextUpdate
      .pipe(
        tap((filter) => {
          if (filter && filter.length >= 1) this.debouncing = true;
        }),
        debounceTime(250)
      )
      .subscribe({
        next: (f: string) => {
          this.filteredOptions$.next([
            ...this.pokemonNames.filter((p) =>
              p
                .toLowerCase()
                .trim()
                .includes((f || '').toLowerCase().trim())
            ),
          ]);
          this.debouncing = false;
          this.cdRef.markForCheck();
        },
        error: () => {
          this.filteredOptions$.next([]);
          this.debouncing = false;
          this.cdRef.markForCheck();
        },
      });
  }

  subscribeToWindowResize() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(250))
      .subscribe((res) => {
        this.currentBreakpoint = this.findCurrentBreakpoint();
        this.cdRef.markForCheck();
      });
  }

  updateFilters($event: any) {
    this.filters = { ...$event };
    this.filterPokemons();
  }

  filterPokemons() {
    const f = this.filters;

    const filterName = (p: Pokemon) => {
      return (
        typeof f.name == 'undefined' ||
        f.name == '' ||
        p.name.toLowerCase().includes(f.name.toLowerCase()) ||
        ('0' + this.poke.pad('' + p.pokedex_number)).includes(f.name)
      );
    };

    const filterType = (p: Pokemon) => {
      const type1 = (p?.type_1 || 'not_Set').toLowerCase();
      const type2 = (p?.type_2 || 'not_Set').toLowerCase();

      return (
        typeof f.types == 'undefined' ||
        f.types.length == 0 ||
        f.types.includes(type1) ||
        f.types.includes(type2)
      );
    };

    const filterGeneration = (p: Pokemon) => {
      return (
        typeof f.generations == 'undefined' ||
        f.generations.length == 0 ||
        f.generations.includes('' + p.generation)
      );
    };

    const filterFn = (p: Pokemon) =>
      filterName(p) && filterType(p) && filterGeneration(p);

    this.currentPokemons = this.pokemons.filter(filterFn);
    this.cdRef.markForCheck();
  }

  findCurrentBreakpoint() {
    if (window.innerWidth < this.resizeBreakpoints[0]) {
      return 1;
    } else if (window.innerWidth < this.resizeBreakpoints[1]) {
      return 2;
    } else if (window.innerWidth < this.resizeBreakpoints[2]) {
      return 3;
    }
    return 4;
  }
}
