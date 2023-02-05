import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/shared/services/poke-api.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  fetching = true;
  id: string;
  pokemon: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private poke: PokeApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
    this.poke.getPokemon(+this.id).then((res) => {
      this.pokemon = res;
      this.fetching = false;
      console.log(res);
      this.cdRef.markForCheck();
      this.getGameIndex();
    });
  }

  getPokemonImage(pokemon: string) {
    return this.poke.getPokemonImgUrl(pokemon);
  }

  getPokemonImageOld(pokemon: string) {
    return this.poke.getPokemonImgUrlOld(pokemon);
  }

  getGameIndex() {
    try {
      const gI = this.pokemon.game_indices;
      if (gI && gI.length > 0) console.log(gI[gI.length - 1].version.url);
    } catch {
      // return ''
    }
  }

  getPokemonBaseStats() {}

  pad(num: string, size: number = 4) {
    while (num.length < size) num = '0' + num;
    return num;
  }

  async ngOnInit() {
    // this.getPokemon().then(
    //   (res) => {
    //     if (res) {
    //       this.pokemon = res.results;
    //       console.log(res.results);
    //     }
    //     this.fetching = false;
    //     this.cdRef.markForCheck();
    //   },
    //   (res) => {
    //     console.error(res);
    //     this.fetching = false;
    //     this.cdRef.markForCheck();
    //   }
    // );
  }
}
