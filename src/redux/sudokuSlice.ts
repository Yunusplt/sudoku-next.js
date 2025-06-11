import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptySudoku } from "@/data/sudokuData";

interface SudokuState {
  sudokuValues: number[][];
  squaresInRow: string[] | null;
  squaresInCol: string[] | null;
  squaresInSelectedBlock: string[] | null;
  isOpenDialog: boolean;
}

const initialState: SudokuState = {
  sudokuValues: emptySudoku,
  squaresInRow: null,
  squaresInCol: null,
  squaresInSelectedBlock: null,
  isOpenDialog: false,
};

const sudokuSlice = createSlice({
  name: "sudoku",
  initialState,
  reducers: {
    setSudokuValues: (state, action: PayloadAction<number[][]>) => {
      state.sudokuValues = action.payload;
    },
    setSquaresInRow: (state, action: PayloadAction<string[] | null>) => {
      state.squaresInRow = action.payload;
    },
    setSquaresInCol: (state, action: PayloadAction<string[] | null>) => {
      state.squaresInCol = action.payload;
    },
    setSquaresInSelectedBlock: (
      state,
      action: PayloadAction<string[] | null>
    ) => {
      state.squaresInSelectedBlock = action.payload;
    },
    setIsOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenDialog = action.payload;
    },
  },
});

export const {
  setSudokuValues,
  setSquaresInRow,
  setSquaresInCol,
  setSquaresInSelectedBlock,
  setIsOpenDialog,
} = sudokuSlice.actions;

export default sudokuSlice.reducer;
