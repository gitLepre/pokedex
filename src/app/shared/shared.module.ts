import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const _SHARED = [
  CommonModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
];
const _COMPONENTS = [FooterComponent, SidenavComponent, TopbarComponent];

@NgModule({
  declarations: [_COMPONENTS],
  imports: [_SHARED],
  exports: [_SHARED, _COMPONENTS],
})
export class SharedModule {}
