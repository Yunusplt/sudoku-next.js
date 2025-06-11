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
  sudokuValues,
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
    let leftEmptySquares: string[];
    while (
      (leftEmptySquares = getEmptySquares(sudokuValuesRef.current)).length > 0
    ) {
      //* Focus each empty square one by one and trigger handleFocus for every empty square
      for (const id of leftEmptySquares) {
        await focusSquareById(id);
      }
    }

    // No empty squares left!!
    alert("Sudoku wurde erfolgreich gelöst!");
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const focusedSquareID = e.target.id;
    const [row, col] = focusedSquareID.split("-").map(Number);

    const rowSquares = Array.from({ length: 9 }, (_, i) => `${row}-${i}`);
    const colSquares = Array.from({ length: 9 }, (_, i) => `${i}-${col}`);
    const selectedBlock = findBlock(focusedSquareID);
    const blockSquares = selectedBlock ? sudokuBlocks[selectedBlock] : null;
    setSquaresInRow(rowSquares);
    setSquaresInCol(colSquares);
    setSquaresInSelectedBlock(blockSquares);

    //* Find and apply valid number
    const valuesToCompare = getValuesToCompare(
      rowSquares,
      colSquares,
      blockSquares,
      sudokuValues
    );

    findValidNumber(valuesToCompare, setSudokuValues, focusedSquareID);
  };

  return { startAutoSolve, handleFocus };
};
