import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { GetPokemonTypesPipe } from '../../../shared/pipes/get-pokemon-types.pipe';
import { ZeroPadPipe } from 'src/app/shared/pipes/zero-pad.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from '../../../shared/services/poke.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatButtonModule,
    MatIconModule,
  ],
})
export class MainInfoComponent {
  pokemon: Pokemon;
  pokemonImageUrl: string;
  @ViewChild('pokemonImage') imgElement!: ElementRef;
  @ViewChild('bg') bg!: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poke: PokeApiService
  ) {
    this.pokemon = this.activatedRoute.snapshot.data['pokemon'];
    this.pokemonImageUrl = this.poke.getPokemonImgUrlFromAssets(
      this.pokemon.pokedex_number
    );

    console.log(this.pokemonImageUrl);

    console.log(
      'Checking Pokemon with National ID: ',
      this.pokemon.pokedex_number
    );
  }

  backToList() {
    this.router.navigate(['/']);
  }

  addToFavorites() {}

  ngAfterViewInit(): void {
    const img = this.imgElement.nativeElement;

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
      let pkmnDetailsHeaderColor = 'white';
      if (+rMax + +gMax + +bMax > threshold * 3) {
        pkmnDetailsHeaderColor = 'black';
      }
      document.documentElement.style.setProperty(
        '--pokemon-details-header-color',
        pkmnDetailsHeaderColor
      );

      const rgba = `rgba(${rMax}, ${gMax}, ${bMax}, 0.75)`;

      document.body.style.backgroundColor = rgba;
      document.documentElement.style.setProperty(
        '--pokemon-details-background-color',
        rgba
      );
    };

    img.src = this.pokemonImageUrl;
  }
}
