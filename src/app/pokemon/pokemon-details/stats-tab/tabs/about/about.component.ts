import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { GetPokemonHeightPipe } from 'src/app/shared/pipes/get-height.pipe';
import { GetPokemonWeightPipe } from 'src/app/shared/pipes/get-weigth.pipe';
import { ConvertToFeetPipe } from 'src/app/shared/pipes/to-feet.pipe';
import { ConvertToLbsPipe } from 'src/app/shared/pipes/to-lbs.pipe';
import { GetPokemonAbilitiesPipe } from 'src/app/shared/pipes/get-abilities.pipe';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/shared/services/poke.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { GetEggGroupsPipe } from 'src/app/shared/pipes/get-eggs.pipe copy';
import { GetGenerationPipe } from 'src/app/shared/pipes/get-generation.pipe';
import { PokemonSpecies } from 'pokedex-promise-v2';
import { ReplaySubject, skip } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    GetPokemonHeightPipe,
    GetPokemonWeightPipe,
    ConvertToFeetPipe,
    ConvertToLbsPipe,
    GetPokemonAbilitiesPipe,
    MatTooltipModule,
    MatIconModule,
    GetEggGroupsPipe,
    GetGenerationPipe,
    MatProgressSpinnerModule,
  ],
})
export class AboutComponent {
  @Input() species$!: ReplaySubject<PokemonSpecies>;
  pokemon: Pokemon;

  description!: string;
  loading = true;

  constructor(
    private router: ActivatedRoute,
    private poke: PokeApiService,
    private cdRef: ChangeDetectorRef
  ) {
    this.pokemon = this.router.snapshot.data['pokemon'];
  }

  ngOnInit() {
    if (this.species$)
      this.species$.subscribe((res: any) => {
        if (!res || !res.flavor_text_entries || !res.flavor_text_entries[0])
          this.description = '';
        this.description = res.flavor_text_entries[0].flavor_text;
        // Find  and remove it
        this.description = this.description.replace(//g, ' ');

        this.loading = false;
        this.cdRef.markForCheck();
      });
    else {
      this.loading = false;
      this.cdRef.markForCheck();
    }
  }
}
