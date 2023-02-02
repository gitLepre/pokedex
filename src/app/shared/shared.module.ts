import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const _SHARED = [CommonModule, FormsModule, MaterialModule, RouterModule];
const _COMPONENTS = [FooterComponent, SidenavComponent, TopbarComponent];

@NgModule({
  declarations: [_COMPONENTS],
  imports: [_SHARED],
  exports: [_SHARED, _COMPONENTS],
})
export class SharedModule {}
