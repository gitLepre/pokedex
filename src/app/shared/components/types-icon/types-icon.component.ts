import { CommonModule, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'types-icon[type]',
  imports: [CommonModule, NgSwitchDefault],
  standalone: true,
  templateUrl: './types-icon.component.html',
  styles: [
    `
      svg {
        fill: var(--pokemon-details-header-color) !important;
        width: 12px !important;
        height: 12px !important;
      }
    `,
  ],
})
export class TypesIconComponent {
  @Input() type!: string | undefined;
}
