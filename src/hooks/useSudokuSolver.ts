import { sudokuBlocks } from "@/data/sudokuData";
import { useRef, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSquaresInCol,
  setSquaresInRow,
  setSudokuValues,
  setSquaresInSelectedBlock,
} from "@/redux/sudokuSlice";
import {
  findBlock,
  getEmptySquares,
  focusSquareById,
  getPossibleNumbers,
} from "@/utils/sudokuHelpers";

export const useSudokuSolver = () => {
  //! redux
  const dispatch = useAppDispatch();
  const { sudokuValues } = useAppSelector((state) => state.sudoku);

  //! hooks
  const sudokuValuesRef = useRef(sudokuValues);

  useEffect(() => {
    sudokuValuesRef.current = sudokuValues;
  }, [sudokuValues]);

  //! functions
  const startAutoSolve = useCallback(async () => {
    let leftEmptySquares: string[] = getEmptySquares(sudokuValuesRef.current);
    while (leftEmptySquares.length > 0) {
      //* Focus each empty square one by one and trigger handleFocus for every empty square
      for (const id of leftEmptySquares) {
        await focusSquareById(id);
      }

      //* Update after one pass
      leftEmptySquares = getEmptySquares(sudokuValuesRef.current);
    }

    //*No empty squares left!!
    alert("Sudoku wurde erfolgreich gelöst!");
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const focusedSquareID = e.target.id;
    const [row, col] = focusedSquareID.split("-").map(Number);

    const rowSquares = Array.from({ length: 9 }, (_, i) => `${row}-${i}`); //* get the all square IDs in the row of the selected square
    const colSquares = Array.from({ length: 9 }, (_, i) => `${i}-${col}`); //* get the all square IDs in the col of the selected square
    const selectedBlock = findBlock(focusedSquareID);
    const blockSquares = selectedBlock ? sudokuBlocks[selectedBlock] : null; //* get the all square IDs in the block of the selected square

    dispatch(setSquaresInRow(rowSquares));
    dispatch(setSquaresInCol(colSquares));
    dispatch(setSquaresInSelectedBlock(blockSquares));

    //* Find possible numbers and apply valid number
    const possibleNumbers = getPossibleNumbers(
      rowSquares,
      colSquares,
      blockSquares,
      sudokuValues
    );

    if (possibleNumbers.length === 1) {
      const copy = sudokuValues.map((r) => [...r]);
      copy[row][col] = possibleNumbers[0];
      dispatch(setSudokuValues(copy));
    }
  };

  return { startAutoSolve, handleFocus };
};
