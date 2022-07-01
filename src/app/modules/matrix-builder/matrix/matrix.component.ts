import { Component, OnInit } from '@angular/core';
import { MatrixService } from '../../../services/matrix.service';
import { MatrixData } from '../../interfaces';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  matrixData: MatrixData = { matrix: [], cell: 0, avg: [], avgOfSum: 0 };

  constructor(private matrixService: MatrixService) {}

  ngOnInit(): void {
    this.matrixService.getMatrixObservable().subscribe((matrixData) => {
      this.matrixData = matrixData;
    });
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

  mouseEnterHover(event: MouseEvent, indexRow: number, indexCol: number): void {
    (event.target as HTMLElement).classList.add('matrix__td__active');

    this.matrixData.matrix.forEach((matrixRow, rowIndex) => {
      matrixRow.row.forEach((_, cellIndex) => {
        this.matrixData.matrix[rowIndex].row[cellIndex].close =
          this.findClosest(indexRow, indexCol).includes(
            this.matrixData.matrix[rowIndex].row[cellIndex].value
          );
      });
    });
  }

  findClosest(indexRow: number, indexCol: number): number[] {
    const chosenCell = this.matrixData.matrix[indexRow].row[indexCol].value;
    const merged: number[] = [];
    this.matrixData.matrix.forEach((matrixRow) =>
      matrixRow.row.map((cell) => merged.push(cell.value))
    );

    const sliceChosen = [
      ...merged.slice(
        0,
        (indexRow + 1) * this.matrixData.matrix[0].row.length -
          (this.matrixData.matrix[0].row.length - indexCol)
      ),
      ...merged.slice(
        (indexRow + 1) * this.matrixData.matrix[0].row.length -
          (this.matrixData.matrix[0].row.length - indexCol) +
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
  }

  mouseLeaveHover(event: MouseEvent): void {
    (event.target as HTMLElement).classList.remove('matrix__td__active');

    this.matrixData.matrix.map((matrixRow) => {
      return matrixRow.row.map((cell) => (cell.close = false));
    });
  }
}
