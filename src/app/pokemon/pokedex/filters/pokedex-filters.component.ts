import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  BehaviorSubject,
  debounceTime,
  ReplaySubject,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FiltersDialogComponent } from 'src/app/shared/components/filters-dialog/filters-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { POKEDEX } from '../../../shared/pokedata/pokedex';
import { pokemonsFilter } from 'src/app/shared/services/util';

const _MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatIconModule,
  MatDialogModule,
];

@Component({
  selector: 'pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss'],
  imports: [..._MATERIAL, MatFormFieldModule, FormsModule, CommonModule],
  standalone: true,
})
export class PokedexFiltersComponent {
  debouncing: boolean = false;

  searchSubscription: Subscription;
  searchText: string = '';
  searchTextUpdate: Subject<string> = new Subject<string>();

  filters: any = {};
  @Output('onFilterChanges') newFilters: EventEmitter<any> =
    new EventEmitter<any>(true);

  filteredOptions$ = new BehaviorSubject<string[]>([
    ...POKEDEX.map((p) => p.name),
  ]);

  constructor(private dialog: MatDialog) {
    this.searchSubscription = this.searchTextUpdate
      .pipe(
        tap((filter) => {
          if (filter && filter.length >= 1) this.debouncing = true;
        }),
        debounceTime(250)
      )
      .subscribe({
        next: (f: string) => {
          this.filterChange({ name: f });

          this.debouncing = false;
        },
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  filterChange(f: any) {
    Object.keys(f).forEach((key) => {
      if (!!f[key]) this.filters[key] = f[key];
      else delete this.filters[key];
    });
    this.newFilters.emit(this.filters);

    this.filteredOptions$.next(
      [...pokemonsFilter(this.filters)].map((p) => p.name)
    );
  }

  onSelectPokemon(evt?: any) {
    if (evt?.source?.selected) {
      this.onAddPokemon(evt.source.value);
    }
  }

  onAddPokemon(pk: string) {
    // const p = this.pokemons.find(
    //   (p) => p.name === pk || this.parsePokemonId(p.url) === pk
    // );
    // if (p) this.pokemonSearched = p;
    // else {
    //   this.snack.error('Could not find the selected name or ID');
    // }
    // this.searchText = '';
    // this.searchTextUpdate.next('');
    // this.cdRef.markForCheck();
  }

  onOpenFiltersDialog() {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      data: { ...this.filters },
      width: '80%',
      maxWidth: '800px',
    });

    (dialogRef as any).afterClosed().subscribe((result: any) => {
      if (result) {
        this.filterChange(result);
      }
    });
  }
}
