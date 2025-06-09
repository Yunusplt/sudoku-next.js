"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import { example_1 } from "@/data/sudokuData";
import { useSudokuSolver } from "@/hooks/useAutoSolver";
import Sudoku from "@/components/Sudoku";

export default function Home() {
  //! states
  const [sudokuValues, setSudokuValues] = useState<number[][]>(example_1);
  const [squaresInRow, setSquaresInRow] = useState<string[] | null>(null);
  const [squaresInCol, setSquaresInCol] = useState<string[] | null>(null);
  const [squaresInSelectedBlock, setSquaresInSelectedBlock] = useState<
    string[] | null
  >(null);

  //! custom hook useSudokuSolver
  const { startFocusing, handleFocus } = useSudokuSolver({
    sudokuValues,
    squaresInRow,
    squaresInCol,
    squaresInSelectedBlock,
    setSquaresInRow,
    setSquaresInCol,
    setSudokuValues,
    setSquaresInSelectedBlock,
  });

  return (
    <main>
      <Sudoku
        sudokuValues={sudokuValues}
        squaresInRow={squaresInRow}
        squaresInCol={squaresInCol}
        squaresInSelectedBlock={squaresInSelectedBlock}
        setSudokuValues={setSudokuValues}
        handleFocus={handleFocus}
      />

      <Button variant="contained" onClick={startFocusing}>
        Löse
      </Button>
    </main>
  );
}
