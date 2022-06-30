export interface Matrix {
  value: number;
  close: boolean;
}

export interface MatrixData {
  matrix: Array<Matrix[]>;
  cell: number;
}

export interface FormValue {
  col: number;
  row: number;
  cell: number;
}
