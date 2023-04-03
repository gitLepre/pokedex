import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Title } from '@angular/platform-browser';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
  RouterEvent,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ` <mat-progress-bar
      mode="indeterminate"
      class="navigation-indicator"
      *ngIf="navigating$ | async"
    ></mat-progress-bar>
    <router-outlet></router-outlet>`,
  styles: [
    `
      .navigation-indicator {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }
    `,
  ],
  standalone: true,
  imports: [RouterOutlet, MatProgressBarModule, CommonModule],
})
export class AppComponent {
  title = "Federico Lorrai's Pokèdex";

  constructor(title: Title, private router: Router) {
    title.setTitle(this.title);
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    router.events.subscribe((routerEvent: any) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  navigating$ = new ReplaySubject<boolean>(1);
  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.navigating$.next(true);
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.navigating$.next(false);
    }
  }
}
