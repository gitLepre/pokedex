import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = "Federico Lorrai's Pokèdex";

  constructor(title: Title) {
    title.setTitle(this.title);
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
