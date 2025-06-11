import React, { ChangeEvent } from "react";
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
  // Handles ...
  const getCellProps = (rowIndex: number, colIndex: number) => {
    const cellId = `${rowIndex}-${colIndex}`;
    const isInRow = squaresInRow?.includes(cellId);
    const isInCol = squaresInCol?.includes(cellId);
    const isInBlock = squaresInSelectedBlock?.includes(cellId);

    return {
      isSelected: isInRow || isInCol || isInBlock,
      cellId,
      value:
        sudokuValues[rowIndex][colIndex] === 0
          ? ""
          : sudokuValues[rowIndex][colIndex],
    };
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const newVal = parseInt(e.target.value) || 0;
    const updatedValues = [...sudokuValues];
    updatedValues[rowIndex][colIndex] = newVal;
    setSudokuValues(updatedValues);
  };
  return (
    <Box>
      {/* // Render Rows */}
      {sudokuValues.map((row, rowIndex) => (
        <Box key={`row-${rowIndex}`} sx={{ display: "flex" }}>
          {/* // Render Cols */}
          {row.map((_, colIndex) => {
            const { isSelected, cellId, value } = getCellProps(
              rowIndex,
              colIndex
            );
            return (
              <TextField
                key={`cell-${cellId}`}
                id={cellId}
                sx={styleTextField(rowIndex, colIndex, isSelected)}
                variant="outlined"
                type="number"
                size="small"
                value={value}
                onChange={(e) => handleOnChange(e, rowIndex, colIndex)}
                onFocus={handleFocus}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default Sudoku;
