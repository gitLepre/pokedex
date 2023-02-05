import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [HomeComponent, PokemonDetailsComponent],
  imports: [SharedModule, PokedexRoutingModule],
})
export class PokedexModule {}
