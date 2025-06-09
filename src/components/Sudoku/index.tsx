import { Box, TextField } from "@mui/material";
import React from "react";

const Sudoku = ({
  sudokuValues,
  squaresInCol,
  squaresInRow,
  squaresInSelectedBlock,
  setSudokuValues,
  handleFocus,
}: {
  sudokuValues: number[][];
  squaresInRow: string[] | null;
  squaresInCol: string[] | null;
  squaresInSelectedBlock: string[] | null;
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
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
                slotProps={{
                  input: {
                    style: {
                      caretColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  },
                }}
                sx={{
                  width: 40,
                  height: 40,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: isSelected ? "#d6f5ff" : "white",
                    "&.Mui-focused": {
                      backgroundColor: "#86eefc",
                    },
                    "& fieldset": {
                      borderWidth: "1px",
                      borderColor: "gray",
                      borderTop:
                        rowIndex === 0
                          ? "2px solid black"
                          : rowIndex % 3 === 0
                          ? "2px solid black"
                          : "1px solid gray",
                      borderBottom:
                        rowIndex === 8 ? "2px solid black" : "1px solid gray",
                      borderLeft:
                        colIndex === 0
                          ? "2px solid black"
                          : colIndex % 3 === 0
                          ? "2px solid black"
                          : "1px solid gray",
                      borderRight:
                        colIndex === 8 ? "2px solid black" : "1px solid gray",
                    },
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& input[type=number]::-webkit-outer-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                  "& input[type=number]::-webkit-inner-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                }}
              />
            );
          })}
        </Box>
      ))}
    </>
  );
};

export default Sudoku;
