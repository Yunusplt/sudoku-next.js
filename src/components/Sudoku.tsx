import React, { ChangeEvent } from "react";
import { Box, TextField } from "@mui/material";
import { styleTextField } from "@/styles/sudokuStyle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSudokuValues } from "@/redux/sudokuSlice";
import { useSudokuSolver } from "@/hooks/useSudokuSolver";

const Sudoku = () => {
  //! redux
  const dispatch = useAppDispatch();
  const { sudokuValues, squaresInRow, squaresInCol, squaresInSelectedBlock } =
    useAppSelector((state) => state.sudoku);

  //! custom hook
  const { handleFocus } = useSudokuSolver();

  //! function
  const getSquareProps = (rowIndex: number, colIndex: number) => {
    const squareID = `${rowIndex}-${colIndex}`;
    const isInRow = squaresInRow?.includes(squareID);
    const isInCol = squaresInCol?.includes(squareID);
    const isInBlock = squaresInSelectedBlock?.includes(squareID);
    const isSelected = isInRow || isInCol || isInBlock;
    const value =
      sudokuValues[rowIndex][colIndex] === 0
        ? ""
        : sudokuValues[rowIndex][colIndex];

    return { isSelected, squareID, value };
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const newValue = Number(e.target.value);
    const sudokuValuesCopy = sudokuValues.map((row) => [...row]);
    sudokuValuesCopy[rowIndex][colIndex] = newValue;
    dispatch(setSudokuValues(sudokuValuesCopy));
  };

  return (
    <Box>
      {/* // Render Rows */}
      {sudokuValues.map((row, rowIndex) => (
        <Box key={`row-${rowIndex}`} sx={{ display: "flex" }}>
          {/* // Render Cols */}
          {row.map((_, colIndex) => {
            const { isSelected, squareID, value } = getSquareProps(
              rowIndex,
              colIndex
            );
            return (
              <TextField
                key={`cell-${squareID}`}
                id={squareID}
                variant="outlined"
                type="number"
                size="small"
                value={value}
                onFocus={handleFocus}
                onChange={(e) => handleOnChange(e, rowIndex, colIndex)}
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
