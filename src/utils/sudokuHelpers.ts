import { sudokuBlocks } from "@/data/sudokuData";
import { SudokuBlocksType } from "@/types/sudokuTypes";

//* Find which block the selected square belongs to
export const findBlock = (
  selectedSquareID: string
): keyof SudokuBlocksType | null => {
  for (const block in sudokuBlocks) {
    if (
      sudokuBlocks[block as keyof SudokuBlocksType].includes(selectedSquareID)
    ) {
      return block as keyof SudokuBlocksType;
    }
  }
  return null;
};

//* Take the values from the given squares' IDs
export const getValuesFromSquares = (
  squares: string[],
  sudokuValues: number[][]
): number[] => {
  return squares.map((id) => {
    const [r, c] = id.split("-").map(Number);
    return sudokuValues[r][c];
  });
};

//* Find the all values to compare with empty square
export const getValuesToCompare = (
  squaresInRow: string[] | null,
  squaresInCol: string[] | null,
  squaresInSelectedBlock: string[] | null,
  sudokuValues: number[][]
): number[] => {
  if (!squaresInRow || !squaresInCol || !squaresInSelectedBlock) return [];
  const rowValues = getValuesFromSquares(squaresInRow, sudokuValues);
  const colValues = getValuesFromSquares(squaresInCol, sudokuValues);
  const blockValues = getValuesFromSquares(
    squaresInSelectedBlock,
    sudokuValues
  );
  const valuesToCompare = [...rowValues, ...colValues, ...blockValues];
  return valuesToCompare;
};

//* Update the value of current square if there is only one possible value for it
export const updateSquareValue = (
  id: string,
  newValue: number,
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const [row, col] = id.split("-").map(Number);
  setSudokuValues((prev) => {
    const copy = prev.map((row) => [...row]);
    copy[row][col] = newValue;
    return copy;
  });
};

//* Find the possible numbers for the current square und update the sudokuValues if there is only one possible number
export const findValidNumber = (
  valuesToCompare: number[],
  setSudokuValues: React.Dispatch<React.SetStateAction<number[][]>>,
  currentSquareID: string
) => {
  const uniqueValues = Array.from(new Set(valuesToCompare));
  const numbersInSudoku = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const impossibleNumbers = uniqueValues.filter((item) => item !== 0);
  const possibleNumbers = numbersInSudoku.filter(
    (item) => !impossibleNumbers.includes(item)
  );

  if (possibleNumbers.length === 1) {
    updateSquareValue(currentSquareID, possibleNumbers[0], setSudokuValues);
  }
};

//* Identify the IDs of cells with a value of 0 (empty cells)
export const getEmptySquares = (currentSudoku: number[][]): string[] => {
  const emptySquareIDs: string[] = [];
  currentSudoku.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        emptySquareIDs.push(`${rowIndex}-${colIndex}`);
      }
    });
  });
  return emptySquareIDs;
};

//* Focus the input element with the given id
export const focusSquareById = async (id: string) => {
  const element = document.getElementById(id) as HTMLInputElement | null;
  if (!element) return;
  element.focus();
  await new Promise((res) => setTimeout(res, 500));
};
