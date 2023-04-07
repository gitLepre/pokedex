import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PokemonClassifications } from 'src/app/shared/models/pokemon-statuses.model';

@Component({
  standalone: true,
  selector: 'status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  imports: [CommonModule, MatChipsModule],
})
export class StatusChipComponent {
  @Input() classification: string | undefined;

  constructor() {}

  PCs = PokemonClassifications;
}
