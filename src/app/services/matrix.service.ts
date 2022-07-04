import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormValue, MatrixData, MatrixRow } from '../modules/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  private matrixData = new BehaviorSubject<MatrixData>({
    matrix: [{ row: [], sum: 0 }],
    avg: [],
    avgOfSum: 0,
    cell: 0,
  });
  private matrixData$ = this.matrixData.asObservable();

  private static randomFromTo(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private static generateMatrix(
    matrixInitial: MatrixData,
    value: FormValue
  ): MatrixData {
    for (let i = 0; i < value.row; i++) {
      const rowRandom: MatrixRow = { row: [], sum: 0 };

      for (let j = 0; j < value.col; j++) {
        const random = MatrixService.randomFromTo(100, 1000);

        rowRandom.row.push({
          value: random,
          close: false,
        });
        rowRandom.sum += random;
      }
      matrixInitial.matrix.push(rowRandom);
    }
    return matrixInitial;
  }

  private static generateSum(matrixData: MatrixData): MatrixData {
    matrixData.matrix.map((matrixRow) => {
      matrixRow.sum = matrixRow.row.reduce((total, cell) => {
        return total + cell.value;
      }, 0);
      return matrixRow;
    });
    const sumTotal = matrixData.matrix.reduce((total, matrixRow) => {
      return total + matrixRow.sum;
    }, 0);
    matrixData.avgOfSum = Math.round(sumTotal / matrixData.matrix.length);

    return matrixData;
  }

  getMatrixObservable(): Observable<MatrixData> {
    return this.matrixData$;
  }

  getMatrixData(): MatrixData {
    return this.matrixData.value;
  }

  generateMatrixData(value: FormValue): void {
    let matrixData: MatrixData = {
      matrix: [],
      avg: [],
      avgOfSum: 0,
      cell: value.cell,
    };

    MatrixService.generateMatrix(matrixData, value);

    this.generateAvg(matrixData);

    MatrixService.generateSum(matrixData);

    this.matrixData.next(matrixData);
  }

  deleteRow(index: number): void {
    const matrixData: MatrixData = this.getMatrixData();

    matrixData.matrix = [
      ...matrixData.matrix.slice(0, index),
      ...matrixData.matrix.slice(index + 1, matrixData.matrix.length),
    ];

    this.generateAvg(matrixData);

    MatrixService.generateSum(matrixData);

    this.matrixData.next(matrixData);
  }

  incrementCell(rowIndex: number, colIndex: number): void {
    const matrixData: MatrixData = this.getMatrixData();

    matrixData.matrix[rowIndex].row[colIndex].value++;

    this.generateAvg(matrixData);

    MatrixService.generateSum(matrixData);

    this.matrixData.next(matrixData);
  }

  addRow(): void {
    const matrixData = this.getMatrixData();
    const matrixRow: MatrixRow = { row: [], sum: 0 };
    let total = 0;

    matrixData.matrix[0].row.forEach(() => {
      const random = MatrixService.randomFromTo(100, 1000);
      total += random;
      matrixRow.row.push({ value: random, close: false });
    });
    matrixRow.sum = total;
    matrixData.matrix.push(matrixRow);

    this.generateAvg(matrixData);

    MatrixService.generateSum(matrixData);

    this.matrixData.next(matrixData);
  }

  private generateAvg(matrixData: MatrixData): MatrixData {
    matrixData.avg = [];

    if (matrixData.matrix[0]?.row !== undefined)
      matrixData.matrix[0].row.forEach((_, rowIndex) => {
        const avgOfCol = matrixData.matrix.reduce((total, matrixRow) => {
          return total + matrixRow.row[rowIndex].value;
        }, 0);

        matrixData.avg.push(Math.round(avgOfCol / matrixData.matrix.length));
      });

    return matrixData;
  }
}
