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
  sudokuValues: number[][];
  setSquaresInRow: (squares: string[] | null) => void;
  setSquaresInCol: (squares: string[] | null) => void;
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>;
  setSquaresInSelectedBlock: (squares: string[] | null) => void;
};

export type SudokuProps = {
  sudokuValues: number[][];
  squaresInRow: string[] | null;
  squaresInCol: string[] | null;
  squaresInSelectedBlock: string[] | null;
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type DialogComponentProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>;
};

export type ButtonComponentProps = {
  startAutoSolve: () => void;
  handleClickOpenDialog: () => void;
};
