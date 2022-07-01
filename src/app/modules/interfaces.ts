export interface Matrix {
  value: number;
  close: boolean;
}

export interface MatrixRow {
  row: Matrix[];
  sum: number;
}

export interface MatrixData {
  matrix: Array<MatrixRow>;
  avg: number[];
  avgOfSum: number;
  cell: number;
}

export interface FormValue {
  col: number;
  row: number;
  cell: number;
}

// const matrixData = {
//   matrix: [
//     {
//       row: [
//         { value: 66, close: false },
//         { value: 66, close: false },
//         { value: 66, close: false },
//       ],
//       sum: 123,
//     },
//     {
//       row: [
//         { value: 66, close: false },
//         { value: 66, close: false },
//         { value: 66, close: false },
//       ],
//       sum: 321,
//     },
//   ],
//   avg: [45, 35, 65],
//   AvgOfSum: 450,
//   cell: 5,
// };
