import React from "react";
import { Box, TextField } from "@mui/material";
import { SudokuProps } from "@/types/sudokuTypes";
import { styleTextField } from "@/styles/sudokuStyle";

const Sudoku = ({
  sudokuValues,
  squaresInCol,
  squaresInRow,
  squaresInSelectedBlock,
  handleFocus,
  setSudokuValues,
}: SudokuProps) => {
  return (
    <Box>
      {sudokuValues.map((row, rowIndex) => (
        <Box key={`row-${rowIndex}`} sx={{ display: "flex" }}>
          {row.map((square, colIndex) => {
            const cellId = `${rowIndex}-${colIndex}`;
            const isInRow = squaresInRow?.includes(cellId);
            const isInCol = squaresInCol?.includes(cellId);
            const isInBlock = squaresInSelectedBlock?.includes(cellId);
            const isSelected = isInRow || isInCol || isInBlock;

            return (
              <TextField
                key={`cell-${rowIndex}-${colIndex}`}
                id={`${rowIndex}-${colIndex}`}
                variant="outlined"
                type="number"
                size="small"
                value={
                  sudokuValues[rowIndex][colIndex] === 0
                    ? ""
                    : sudokuValues[rowIndex][colIndex]
                }
                onChange={(e) => {
                  const newVal = parseInt(e.target.value) || 0;
                  const updatedValues = [...sudokuValues];
                  updatedValues[rowIndex][colIndex] = newVal;
                  setSudokuValues(updatedValues);
                }}
                onFocus={handleFocus}
                sx={styleTextField(rowIndex, colIndex, isSelected)}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default Sudoku;
