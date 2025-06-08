export default function Home() {
  const emptySudoku = Array.from({ length: 9 }, () => Array(9).fill(0));

  console.log(emptySudoku);

  return <main>SUDOKU</main>;
}
