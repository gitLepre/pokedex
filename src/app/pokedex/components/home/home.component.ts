import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  imgUrl = '';
  form: FormGroup;

  fetching: boolean = true;

  pokemons: any[] = [];
  nextPage: number = 1;

  constructor(
    private cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    private poke: PokeApiService
  ) {
    this.form = fb.group({
      id: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.getPokemonList().then(
      (res) => {
        if (res) {
          this.pokemons = res.results;
          console.log(res.results);
        }
        this.fetching = false;
        this.cdRef.markForCheck();
      },
      (res) => {
        console.error(res);
        this.fetching = false;
        this.cdRef.markForCheck();
      }
    );
  }

  async loadMore() {
    try {
      this.fetching = true;
      this.cdRef.markForCheck();
      this.getPokemonList(this.nextPage++).then(
        (res) => {
          if (res) this.pokemons.push(...res.results);
          this.fetching = false;
          this.cdRef.markForCheck();
        },
        (res) => {
          console.error(res);
          this.fetching = false;
          this.cdRef.markForCheck();
        }
      );
    } catch (e: any) {
      console.error(e);
    }
    this.cdRef.markForCheck();
  }

  parsePokemonId(url: string) {
    const splits = url.split('/');
    const l = splits.length;
    console.log();
    return splits[l - 2];
  }

  getPokemonList(page?: number) {
    return this.poke.getPokemonList(page);
  }

  getPokemonImage(pokemon: string) {
    return this.poke.getPokemonImgUrl(pokemon);
  }

  getPokemonImageOld(pokemon: string) {
    return this.poke.getPokemonImgUrlOld(pokemon);
  }

  // getPokemonImageByUrl(url: string) {
  //   const id = this.parsePokemonId(url);
  //   return this.poke.getPokemonImgUrl(id);
  // }

  // onSubmit(): void {
  //   const f = Object.assign({}, this.form.getRawValue());
  //   this.poke.api.getPokemonByName(f.id).then((p: any) => {
  //     if (p && p.id) this.imgUrl = this.poke.getPokemonImgUrl(p.id);
  //   });
  // }

  pad(num: string, size: number = 4) {
    while (num.length < size) num = '0' + num;
    return num;
  }
}
