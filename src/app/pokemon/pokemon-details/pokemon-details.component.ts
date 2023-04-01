import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokeApiService } from '../../shared/services/poke.service';
import { MatChipsModule } from '@angular/material/chips';
import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ZeroPadPipe } from 'src/app/shared/pipes/zero-pad.pipe';
import { GetPokemonTypesPipe } from 'src/app/shared/pipes/get-types.pipe';
import { PokeballDivComponent } from 'src/app/shared/components/pokeball-div/pokeball-div.component';
import { StatsTabComponent } from './stats-tab/stats-tab.component';
import { MainInfoComponent } from './main-info/main-info.component';

const _COMMONS = [NgFor, NgIf, AsyncPipe];

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  imports: [
    _COMMONS,
    MatChipsModule,
    ZeroPadPipe,
    GetPokemonTypesPipe,
    PokeballDivComponent,
    StatsTabComponent,
    MainInfoComponent,
  ],
})
export class PokemonDetailsComponent {}
