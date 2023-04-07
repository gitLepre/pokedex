import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { GetPokemonTypesPipe } from '../../../shared/pipes/get-types.pipe';
import { ZeroPadPipe } from 'src/app/shared/pipes/zero-pad.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from '../../../shared/services/poke.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GetTypeIconPipe } from 'src/app/shared/pipes/get-type-icon.pipe';
import { StatusChipComponent } from '../status-chip/status-chip.component';

const TYPE_COLORS: any = {
  bug: '#92bc2c',
  dark: '#595761',
  dragon: '#0c69c8',
  electric: '#f2d94e',
  fairy: '#fba54c',
  fighting: '#ee90e6',
  fire: '#d3425f',
  flying: '#a1bbec',
  ghost: '#5f6dbc',
  grass: '#5fbd58',
  ground: '#da7c4d',
  ice: '#75d0c1',
  normal: '#a0a29f',
  poison: '#b763cf',
  psychic: '#fa8581',
  rock: '#c9bb8a',
  steel: '#5695a3',
  water: '#539ddf',
};

@Component({
  standalone: true,
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
  imports: [
    MatChipsModule,
    NgIf,
    NgFor,
    GetPokemonTypesPipe,
    ZeroPadPipe,
    GetTypeIconPipe,
    MatButtonModule,
    MatIconModule,
    StatusChipComponent,
  ],
})
export class MainInfoComponent {
  pokemon: Pokemon;
  @ViewChild('pokemonImage') imgElement!: ElementRef;
  @ViewChild('bg') bg!: ElementRef;
  @HostBinding('style.background-color') bgColor = 'white';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poke: PokeApiService
  ) {
    this.pokemon = this.activatedRoute.snapshot.data['pokemon'];

    console.log(
      'Checking Pokemon with National ID: ',
      this.pokemon.pokedex_number
    );

    this.setBgColor();
  }

  ngAfterViewInit(): void {
    this.findPokemonMainColor(this.pokemon, this.imgElement);
  }

  backToList() {
    this.router.navigate(['/']);
  }

  addToFavorites() {}

  setBgColor() {
    // Blend the type_1 and type_2 color of the pokemon, combining the r g and b values and setting the opacity to 0.5

    const type1 = (this.pokemon?.type_1 || '').toLowerCase();
    const type2 = (this.pokemon?.type_2 || '')?.toLowerCase();

    if (!type1) this.bgColor = `white`;
    if (!type2) this.bgColor = TYPE_COLORS[type1] + '66';
    else {
      this.bgColor = TYPE_COLORS[type1] + '66';
    }

    // const pkmnDetailsHeaderColor = type1 !== 'normal' ? 'white' : 'black';
    const pkmnDetailsHeaderColor = 'black';
    document.documentElement.style.setProperty(
      '--pokemon-details-header-color',
      pkmnDetailsHeaderColor
    );
  }

  findPokemonMainColor(pokemon: Pokemon, imgElement: ElementRef) {
    const img = imgElement.nativeElement;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context: any = canvas.getContext('2d');
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colors = [];
      const colorCounts: any = {};

      const limitColorValue = 255;
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.min(data[i], limitColorValue);
        const g = Math.min(data[i + 1], limitColorValue);
        const b = Math.min(data[i + 2], limitColorValue);
        const color = `rgb(${r}, ${g}, ${b})`;

        if (color === 'rgb(0, 0, 0)' || color === 'rgb(255, 255, 255)') {
          continue;
        }

        if (!colorCounts[color]) {
          colorCounts[color] = 1;
        } else {
          colorCounts[color]++;
        }
      }

      let maxCount = 0;
      let maxColor = '';

      for (const color in colorCounts) {
        if (colorCounts[color] > maxCount) {
          maxCount = colorCounts[color];
          maxColor = color;
        }
      }

      const [rMax, gMax, bMax] = maxColor.replace(/[^\d,]/g, '').split(',');
      const threshold = 180;
      // let pkmnDetailsHeaderColor = 'white';
      // if (+rMax + +gMax + +bMax > threshold * 3) {
      //   pkmnDetailsHeaderColor = 'black';
      // }
      // document.documentElement.style.setProperty(
      //   '--pokemon-details-header-color',
      //   pkmnDetailsHeaderColor
      // );

      const rgba = `rgba(${rMax}, ${gMax}, ${bMax}, 0.75)`;

      // document.body.style.backgroundColor = rgba;
      // document.documentElement.style.setProperty(
      //   '--pokemon-details-background-color',
      //   rgba
      // );
    };

    img.src = this.poke.getPokemonImgUrlFromAssets(this.pokemon.pokedex_number);
  }
}
