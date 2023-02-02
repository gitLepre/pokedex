import { NgModule } from '@angular/core';

// Mat Modules
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const _MATERIALS = [
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatMenuModule,
  MatSliderModule,
  MatTooltipModule,
  MatSidenavModule,
  MatListModule,
  MatRippleModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [_MATERIALS],
  exports: [_MATERIALS],
})
export class MaterialModule {}
