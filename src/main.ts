import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { AppComponent } from './app/app.component';

import { APP_ROUTES } from './app/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
  ],
}).catch((err) => console.error(err));
