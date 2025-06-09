import { sudokuBlocks } from "@/data/sudokuData";
import { UseSudokuSolverParams } from "@/types/sudokuTypes";
import {
  findBlock,
  getValuesFromSquares,
  updateSquareValue,
} from "@/utils/sudoku";
import { useRef, useCallback, useEffect, useState } from "react";

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
  //! states
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);

  //! hooks
  const sudokuValuesRef = useRef(sudokuValues);

  useEffect(() => {
    sudokuValuesRef.current = sudokuValues;
  }, [sudokuValues]);

  useEffect(() => {
    if (!squaresInRow || !squaresInCol || !squaresInSelectedBlock) return;

    const rowValues = getValuesFromSquares(squaresInRow, sudokuValues);
    const colValues = getValuesFromSquares(squaresInCol, sudokuValues);
    const blockValues = getValuesFromSquares(
      squaresInSelectedBlock,
      sudokuValues
    );

    //* Combine all values from row, column, and block
    const allValues = [...rowValues, ...colValues, ...blockValues];
    const uniqueValues = Array.from(new Set(allValues));

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const impossibleNumbers = uniqueValues.filter((item) => item !== 0);
    const possibleNumbers = numbers.filter(
      (item) => !impossibleNumbers.includes(item)
    );

    //* If exactly one possible value is left for this square, update it
    if (possibleNumbers.length === 1) {
      updateSquareValue(
        `${selectedRow}-${selectedCol}`,
        possibleNumbers[0],
        setSudokuValues
      );
    }
  }, [
    squaresInRow,
    squaresInCol,
    squaresInSelectedBlock,
    sudokuValues,
    selectedCol,
    selectedRow,
    setSudokuValues,
  ]);

  //! functions
  const startFocusing = useCallback(async () => {
    while (true) {
      const currentSudoku = sudokuValuesRef.current;

      const zeroCells: string[] = [];

      currentSudoku.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value === 0) {
            zeroCells.push(`${rowIndex}-${colIndex}`);
          }
        });
      });

      if (zeroCells.length === 0) {
        alert("İşlem bitti!");
        break;
      }

      for (const id of zeroCells) {
        const el = document.getElementById(id) as HTMLInputElement | null;
        if (!el) continue;

        el.focus();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const selectedSquareID = e.target.id;
    const [row, col] = selectedSquareID.split("-").map(Number);
    setSelectedRow(row);
    setSelectedCol(col);
    const selectedBlock = findBlock(selectedSquareID);
    const rowSquares = Array.from({ length: 9 }, (_, i) => `${row}-${i}`);
    const colSquares = Array.from({ length: 9 }, (_, i) => `${i}-${col}`);
    setSquaresInRow(rowSquares);
    setSquaresInCol(colSquares);
    if (selectedBlock) {
      setSquaresInSelectedBlock(sudokuBlocks[selectedBlock]);
      console.log(sudokuBlocks[selectedBlock]);
    } else {
      setSquaresInSelectedBlock(null);
    }
  };

  return { startFocusing, handleFocus };
};
