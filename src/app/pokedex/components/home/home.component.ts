import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  firstValueFrom,
  Subject,
  tap,
  Subscription,
  take,
} from 'rxjs';
import { POKEMONS } from 'src/app/shared/services/pokemon-list';
import { SnackService } from 'src/app/shared/services/snack.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  form: UntypedFormGroup;

  fetching: boolean = true;
  debouncing: boolean = false;

  pokemonSearched: any;
  currentPokemons: any[] = [];
  pokemons: any[] = [];
  pokemonNames: string[] = [];
  nextPage: number = 0;

  searchSubscription: Subscription;
  searchText: string = '';
  searchTextUpdate: Subject<string> = new Subject<string>();
  filteredOptions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  filteredOptions = [...POKEMONS];

  constructor(
    private cdRef: ChangeDetectorRef,
    fb: UntypedFormBuilder,
    private poke: PokeApiService,
    private snack: SnackService
  ) {
    this.form = fb.group({
      search: ['', Validators.required],
    });

    this.searchSubscription = this.searchTextUpdate
      .pipe(
        tap((filter) => {
          if (filter && filter.length >= 1) this.debouncing = true;
        }),
        debounceTime(250)
      )
      .subscribe({
        next: (f: string) => {
          // this.poke.getPokemon(filter).then((p)=>{

          // })
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

  ngOnInit() {
    this.poke
      .getPokemons()
      .pipe(take(1), delay(300))
      .subscribe({
        next: (res) => {
          if (res) {
            this.pokemons = res.results.slice(0, 1008);
            this.pokemonNames = res.results
              .slice(0, 1008)
              .map((p) => p.name || '');
            this.loadMore();
          }
          this.fetching = false;
          this.cdRef.markForCheck();
        },
        error: (res) => {
          console.error(res);
          this.fetching = false;
          this.cdRef.markForCheck();
        },
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  async loadMore() {
    this.fetching = true;
    this.cdRef.markForCheck();
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 300));
    this.currentPokemons.push(
      ...this.pokemons.slice(this.nextPage * 12, ++this.nextPage * 12)
    );
    this.fetching = false;
    this.cdRef.markForCheck();
  }

  parsePokemonId(url: string) {
    const splits = url.split('/');
    const l = splits.length;
    console.log();
    return splits[l - 2];
  }

  getPokemonImage(pokemon: string) {
    return this.poke.getPokemonImgUrl(pokemon);
  }

  getPokemonImageOld(pokemon: string) {
    return this.poke.getPokemonImgUrlOld(pokemon);
  }

  // onSubmit(id?: string): void {
  //   let inputId = id ? id : this.searchText || '';

  //   const p = this.pokemons.find(
  //     (p) => p.name === inputId || this.parsePokemonId(p.url) === inputId
  //   );
  //   if (p) {
  //     this.pokemonSearched = p;
  //     console.log(p);
  //   }
  // }

  pad(num: string, size: number = 4) {
    while (num.length < size) num = '0' + num;
    return num;
  }

  onEnterPokemon(evt?: any) {
    if (evt?.source?.selected) {
      this.onAddPokemon(evt.source.value);
    }
  }

  onAddPokemon(pk: string) {
    const p = this.pokemons.find(
      (p) => p.name === pk || this.parsePokemonId(p.url) === pk
    );
    if (p) this.pokemonSearched = p;
    else {
      this.snack.error('Could not find the selected name or ID');
    }
    this.searchText = '';
    this.searchTextUpdate.next('');
    this.cdRef.markForCheck();
  }

  removePokemon(): void {
    this.pokemonSearched = null;
    this.searchText = '';
    this.searchTextUpdate.next('');
    this.cdRef.markForCheck();
  }
}
