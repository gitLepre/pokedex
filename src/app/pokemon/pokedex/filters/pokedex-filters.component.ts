import { Component, Input } from '@angular/core';
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
  styles: [],
  imports: [..._MATERIAL, MatFormFieldModule, FormsModule, CommonModule],
  standalone: true,
})
export class PokedexFiltersComponent {
  debouncing: boolean = false;

  searchSubscription: Subscription;
  searchText: string = '';
  searchTextUpdate: Subject<string> = new Subject<string>();

  filters: any = {};

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
          this.filteredOptions$.next(
            POKEDEX.filter(
              (p) => p?.name && p.name.toLowerCase().includes(f.toLowerCase())
            ).map((p) => p.name)
          );
          this.debouncing = false;
        },
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  filterChange(f: any) {
    Object.keys(f).forEach((key) => {
      if (f[key]) this.filters[key] = JSON.stringify(f[key]);
      else delete this.filters[key];
    });
    console.log(this.filters);
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
      data: this.filters,
    });

    (dialogRef as any).afterClosed().subscribe((result: any) => {
      if (result) {
        this.filterChange(result);
      }
    });
  }
}
