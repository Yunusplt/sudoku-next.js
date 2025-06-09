export type SudokuBlocksType = {
  A: string[];
  B: string[];
  C: string[];
  D: string[];
  E: string[];
  F: string[];
  G: string[];
  H: string[];
  I: string[];
};

export type UseSudokuSolverParams = {
  squaresInRow: string[] | null;
  squaresInCol: string[] | null;
  sudokuValues: number[][];
  squaresInSelectedBlock: string[] | null;
  setSquaresInRow: (squares: string[] | null) => void;
  setSquaresInCol: (squares: string[] | null) => void;
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>;
  setSquaresInSelectedBlock: (squares: string[] | null) => void;
};
