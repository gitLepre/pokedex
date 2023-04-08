import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, NgFor } from '@angular/common';
import { PokeApiService } from '../../services/poke.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class FiltersDialogComponent implements OnInit {
  form: FormGroup;

  types = this.poke.types;
  generations = this.poke.generations;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FiltersDialogComponent>,
    private poke: PokeApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      generations: [this.data?.generations || ''],
      types: [this.data?.types || ''],
    });
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
