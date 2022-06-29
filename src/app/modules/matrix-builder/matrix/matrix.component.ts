import { Component, OnInit } from '@angular/core';
import { MatrixService } from '../../../services/matrix.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  matrix: Array<number[]> | [] = [];
  arrayOfSum: number[] = [];
  closestCells: Array<boolean[]> = [];
  refillCellHover: Array<boolean[]> = [];

  constructor(private matrixService: MatrixService) {}

  ngOnInit(): void {
    this.matrixService.getMatrixObservable().subscribe((matrixData) => {
      this.matrix = matrixData.matrix;
      this.arrayOfSum = [];
      this.pushSumToArray(this.arrayOfSum);
      this.refillCellHover = [];
      this.closestCells = [];
      this.matrix.forEach((row, index) => {
        this.refillCellHover[index] = Array(row.length).fill(false);
        this.closestCells[index] = Array(row.length).fill(false);
      });
    });
  }

  pushSumToArray(array: number[]): void {
    this.matrix.forEach((row) => {
      array.push(row.reduce((total, cell) => total + cell));
    });
  }

  getAvgOfCol(index: number): number {
    let amount = 0;

    this.matrix.forEach((col) => {
      amount += col[index];
    });

    return Math.round(amount / this.matrix.length);
  }

  getAvgOfSum(): number {
    const sum = this.arrayOfSum.reduce((total, cell) => total + cell);
    return Math.round(sum / this.arrayOfSum.length);
  }

  deleteRow(index: number): void {
    this.matrixService.deleteRow(index);
  }

  addRow(): void {
    this.matrixService.addRow();
  }

  incrementCell(rowIndex: number, colIndex: number): void {
    this.matrixService.incrementCell(rowIndex, colIndex);
  }

  mouseEnterHover(indexRow: number, indexCol: number): void {
    this.refillCellHover[indexRow][indexCol] = true;

    this.matrix.forEach((row, rowIndex) => {
      row.forEach((_, cellIndex) => {
        this.closestCells[rowIndex][cellIndex] = this.findClosest(
          indexRow,
          indexCol
        ).includes(this.matrix[rowIndex][cellIndex]);
      });
    });
  }

  findClosest(indexRow: number, indexCol: number): number[] {
    const chosenCell = this.matrix[indexRow][indexCol];
    const merged: number[] = [...this.matrix.flat(1)];

    const sliceChosen = [
      ...merged.slice(
        0,
        (indexRow + 1) * this.matrix[0].length -
          (this.matrix[0].length - indexCol)
      ),
      ...merged.slice(
        (indexRow + 1) * this.matrix[0].length -
          (this.matrix[0].length - indexCol) +
          1,
        merged.length
      ),
    ];

    return [...sliceChosen]
      .sort((cellA, cellB) => {
        const isClosestA = Math.abs(cellA - chosenCell);
        const isClosestB = Math.abs(cellB - chosenCell);
        if (isClosestA > isClosestB) return 1;
        else if (isClosestA < isClosestB) return -1;
        return 0;
      })
      .slice(0, this.matrixService.getMatrixData().cell);

    // let indexes: number[] = [];
    // closest.forEach((num) => {
    //   indexes.push(merged.findIndex((cell) => cell === num));
    // });
  }

  mouseLeaveHover(indexRow: number, indexCol: number): void {
    this.refillCellHover[indexRow][indexCol] = false;

    this.closestCells.map((row) => {
      return row.fill(false);
    });
  }

  cellTrackBy(index: number): number {
    return index;
  }
}
