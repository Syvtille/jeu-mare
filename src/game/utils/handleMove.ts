export const handleMove = (grid: Array<Array<string>>, currentPlayer: string, columnIndex: number) => {
  //si la colonne est pleine, on retourne la grille originale
  if (grid[columnIndex].length >= 6) return grid

  const newGrid = grid.map((column, index) => {
    if (index === columnIndex) {
      return [...column, currentPlayer]
    }
    return column
  });

  return newGrid
}