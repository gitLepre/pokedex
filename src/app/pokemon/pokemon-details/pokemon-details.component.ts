import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class PokemonDetailsComponent {
  constructor() {}
}
