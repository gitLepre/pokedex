import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Social, SOCIAL_URLS } from '../../models/social.model';

@Component({
  selector: 'my-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  mail: string = 'io@federicolorrai.it';
  Social = Social;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openSocial(s: Social) {
    const url = SOCIAL_URLS[s];
    if (url) window.open(url, '_blank');
  }
}
