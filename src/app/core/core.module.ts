import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';

const _CORE = [BrowserAnimationsModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [_CORE],
  exports: [_CORE],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    iconRegistry: MatIconRegistry
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
    iconRegistry.setDefaultFontSetClass('material-icons-round');
  }
}
