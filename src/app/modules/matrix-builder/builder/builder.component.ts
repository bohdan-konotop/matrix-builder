import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatrixService } from '../../../services/matrix.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent {
  form = this.fb.group({
    col: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
    ],
    row: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
    ],
    cell: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(private fb: FormBuilder, private matrixService: MatrixService) {}

  generateMatrix(): void {
    if (!this.form.valid) return;

    this.matrixService.generateMatrixData(this.form.value);
  }
}
