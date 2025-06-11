"use client";
import { useState } from "react";
import Sudoku from "@/components/Sudoku";
import { Container, Typography } from "@mui/material";
import { emptySudoku } from "@/data/sudokuData";
import { styleContainer } from "@/styles/homePageStyle";
import { useSudokuSolver } from "@/hooks/useSudokuSolver";
import DialogComponent from "@/components/DialogComponent";
import ButtonComponent from "@/components/ButtonComponent";

export default function Home() {
  //! states
  const [sudokuValues, setSudokuValues] = useState<number[][]>(emptySudoku);
  const [squaresInRow, setSquaresInRow] = useState<string[] | null>(null);
  const [squaresInCol, setSquaresInCol] = useState<string[] | null>(null);
  const [squaresInSelectedBlock, setSquaresInSelectedBlock] = useState<
    string[] | null
  >(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  //! functions
  const handleClickOpenDialog = () => {
    setIsOpenDialog(true);
  };

  //! custom hook useSudokuSolver
  const { startAutoSolve, handleFocus } = useSudokuSolver({
    sudokuValues,
    setSquaresInRow,
    setSquaresInCol,
    setSudokuValues,
    setSquaresInSelectedBlock,
  });

  return (
    <Container sx={styleContainer}>
      <Typography
        sx={{
          fontSize: 36,
          color: "#666",
          mb: 4,
        }}
      >
        SUDOKU
      </Typography>
      <Sudoku
        sudokuValues={sudokuValues}
        squaresInRow={squaresInRow}
        squaresInCol={squaresInCol}
        squaresInSelectedBlock={squaresInSelectedBlock}
        setSudokuValues={setSudokuValues}
        handleFocus={handleFocus}
      />
      <ButtonComponent
        handleClickOpenDialog={handleClickOpenDialog}
        startAutoSolve={startAutoSolve}
      />
      <DialogComponent
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        setSudokuValues={setSudokuValues}
      />
    </Container>
  );
}
