import React from "react";
import { Box, Button } from "@mui/material";
import { ButtonComponentProps } from "@/types/sudokuTypes";

const ButtonComponent = ({
  startAutoSolve,
  handleClickOpenDialog,
}: ButtonComponentProps) => {
  return (
    <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
      <Button variant="contained" onClick={handleClickOpenDialog}>
        Sudoku laden
      </Button>
      <Button variant="contained" color="success" onClick={startAutoSolve}>
        Sudoku lösen
      </Button>
    </Box>
  );
};

export default ButtonComponent;
