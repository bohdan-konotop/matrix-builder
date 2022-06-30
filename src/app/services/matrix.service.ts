import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormValue, Matrix, MatrixData } from '../modules/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  private matrixData = new BehaviorSubject<MatrixData>({ matrix: [], cell: 0 });
  private matrixData$ = this.matrixData.asObservable();

  private static randomFromTo(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getMatrixObservable(): Observable<MatrixData> {
    return this.matrixData$;
  }

  getMatrixData(): MatrixData {
    return this.matrixData.value;
  }

  generateMatrix(value: FormValue): void {
    let matrixData: MatrixData = { matrix: [], cell: value.cell };

    for (let i = 0; i < value.col; i++) {
      const rowRandom: Array<Matrix> = [];

      for (let j = 0; j < value.row; j++) {
        rowRandom.push({
          value: MatrixService.randomFromTo(100, 1000),
          close: false,
        });
      }
      matrixData.matrix.push(rowRandom);
    }
    this.matrixData.next(matrixData);
  }

  deleteRow(index: number): void {
    const matrixData: MatrixData = this.getMatrixData();

    matrixData.matrix = [
      ...matrixData.matrix.slice(0, index),
      ...matrixData.matrix.slice(index + 1, matrixData.matrix.length),
    ];
    this.matrixData.next(matrixData);
  }

  incrementCell(rowIndex: number, colIndex: number): void {
    const matrixData: MatrixData = this.getMatrixData();

    matrixData.matrix[rowIndex][colIndex].value++;
    this.matrixData.next(matrixData);
  }

  addRow(): void {
    const matrixData = this.getMatrixData();
    let row: Matrix[] = [];

    matrixData.matrix[0].forEach(() => {
      row.push({ value: MatrixService.randomFromTo(100, 1000), close: false });
    });
    matrixData.matrix.push(row);
    this.matrixData.next(matrixData);
  }
}
