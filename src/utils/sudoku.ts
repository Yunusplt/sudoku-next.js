import { sudokuBlocks } from "@/data/sudokuData";
import { SudokuBlocksType } from "@/types/sudokuTypes";

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

export const getValuesFromSquares = (
  squares: string[],
  sudokuValues: number[][]
): number[] => {
  return squares.map((id) => {
    const [r, c] = id.split("-").map(Number);
    return sudokuValues[r][c];
  });
};
