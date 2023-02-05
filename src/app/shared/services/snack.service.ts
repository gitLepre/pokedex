import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string, title: string = 'OK') {
    this.snackBar.open(message, title, {
      panelClass: ['red-snackbar'],
      duration: 4000,
    });
  }

  info(message: string, title: string = 'OK') {
    this.snackBar.open(message, title, {
      panelClass: ['blue-snackbar'],
      duration: 4000,
    });
  }

  success(message: string, title: string = 'OK') {
    this.snackBar.open(message, title, {
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
}
