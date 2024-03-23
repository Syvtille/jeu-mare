import React from 'react'
import Grid from "./Grid";

const Game = () => {

  const NB_COLUMNS = 7;
  const NB_ROWS = 6;

  const [grid, setGrid] = React.useState<Array<Array<string>>>([])
  const [currentPlayer, setCurrentPlayer] = React.useState<string>('red')

  const checkWinner = () => {
    const directions = [
      { x: 0, y: 1 }, // vertical
      { x: 1, y: 0 }, // horizontal
      { x: 1, y: 1 }, // diagonal down-right
      { x: 1, y: -1 } // diagonal down-left
    ];

    for (let y = 0; y < NB_ROWS; y++) {
      for (let x = 0; x < NB_COLUMNS; x++) {
        const player = grid[y][x];
        if (!player) continue;

        for (const direction of directions) {
          let count = 0;
          let dx = x;
          let dy = y;

          while (count < 4) {
            if (grid[dy]?.[dx] !== player) break;
            dx += direction.x;
            dy += direction.y;
            count++;
          }

          if (count === 4) return player;
        }
      }
    }

    return null;
  }

  const isColumnFull = (columnIndex: number) => {
    return grid[columnIndex].length >= NB_ROWS
  }

  const handleMove = (columnIndex: number) => {
    if (isColumnFull(columnIndex)) return

    // Check if currentPlayer is not undefined
    if (currentPlayer) {
      const newGrid = grid.map((column, index) => {
        if (index === columnIndex) {
          return [...column, currentPlayer]
        }
        return column
      })

      setGrid(newGrid)
      setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red')

      const winner = checkWinner()
      if (winner) {
        alert(`Player ${winner} won!`)
      }
    }
  }

  return (
    <Grid nbRows={NB_ROWS} nbColumns={NB_COLUMNS} currentGrid={grid} onMove={handleMove}></Grid>
  )
}

export default Game