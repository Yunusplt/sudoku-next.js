import { sudokuBlocks } from "@/data/sudokuData";
import { useRef, useCallback, useEffect } from "react";
import { UseSudokuSolverParams } from "@/types/sudokuTypes";
import {
  findBlock,
  getEmptySquares,
  focusSquareById,
  findValidNumber,
  getValuesToCompare,
} from "@/utils/sudokuHelpers";

export const useSudokuSolver = ({
  squaresInRow,
  squaresInCol,
  sudokuValues,
  squaresInSelectedBlock,
  setSquaresInRow,
  setSquaresInCol,
  setSudokuValues,
  setSquaresInSelectedBlock,
}: UseSudokuSolverParams) => {
  //! hooks
  const sudokuValuesRef = useRef(sudokuValues);

  useEffect(() => {
    sudokuValuesRef.current = sudokuValues;
  }, [sudokuValues]);

  //! functions
  const startAutoSolve = useCallback(async () => {
    while (true) {
      const currentSudoku = sudokuValuesRef.current;
      const emptySquareIDs = getEmptySquares(currentSudoku);

      //* Stop the startAutoSolve function when there are no empty squares left
      if (emptySquareIDs.length === 0) {
        alert("Sudoku wurde erfolgreich gelöst!");
        break;
      }
      //* Focus each empty square one by one and trigger handleFocus for every empty square
      for (const id of emptySquareIDs) {
        await focusSquareById(id);
      }
    }
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const selectedSquareID = e.target.id;
    const [row, col] = selectedSquareID.split("-").map(Number);

    const rowSquares = Array.from({ length: 9 }, (_, i) => `${row}-${i}`);
    const colSquares = Array.from({ length: 9 }, (_, i) => `${i}-${col}`);
    setSquaresInRow(rowSquares);
    setSquaresInCol(colSquares);

    const selectedBlock = findBlock(selectedSquareID);
    if (selectedBlock) {
      setSquaresInSelectedBlock(sudokuBlocks[selectedBlock]);
    } else {
      setSquaresInSelectedBlock(null);
    }

    //* Find and apply valid number
    const valuesToCompare = getValuesToCompare(
      squaresInRow,
      squaresInCol,
      squaresInSelectedBlock,
      sudokuValues
    );

    findValidNumber(valuesToCompare, setSudokuValues, selectedSquareID);
  };

  return { startAutoSolve, handleFocus };
};
