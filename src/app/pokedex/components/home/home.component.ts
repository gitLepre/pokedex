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
    this.pokemons = (
      await firstValueFrom(this.getPokemonList().pipe(delay(600)))
    ).results;
    this.fetching = false;
    this.cdRef.markForCheck();
    console.log(this.pokemons);
  }

  parsePokemonId(url: string = 'https://pokeapi.co/api/v2/pokemon/12/') {
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

  getPokemonImageByUrl(url: string) {
    const id = this.parsePokemonId(url);
    return this.poke.getPokemonImgUrl(id);
  }

  // onSubmit(): void {
  //   const f = Object.assign({}, this.form.getRawValue());
  //   this.poke.api.getPokemonByName(f.id).then((p: any) => {
  //     if (p && p.id) this.imgUrl = this.poke.getPokemonImgUrl(p.id);
  //   });
  // }
}
