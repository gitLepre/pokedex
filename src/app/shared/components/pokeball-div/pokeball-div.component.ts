import { Component, Input } from '@angular/core';
@Component({
  standalone: true,
  selector: 'pokeball-div',
  templateUrl: './pokeball-div.component.html',
  styleUrls: ['./pokeball-div.component.scss'],
})
export class PokeballDivComponent {
  @Input() mainColor!: string;

  constructor() {}
}
