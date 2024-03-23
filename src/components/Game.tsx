import React, {useEffect} from 'react'
import Grid from "./Grid";

const Game = () => {

  const NB_COLUMNS = 7;
  const NB_ROWS = 6;

  const [grid, setGrid] = React.useState<Array<Array<string>>>(Array.from({ length: NB_COLUMNS }, () => []))
  const [currentPlayer, setCurrentPlayer] = React.useState<string>('red')

  const checkWinner = () => {
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 }
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

    if (currentPlayer) {
      const newGrid = grid.map((column, index) => {
        if (index === columnIndex) {
          return [...column, currentPlayer]
        }
        return column
      })

      setGrid(newGrid)
      setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red')
    }
  }

  useEffect(() => {
    const winner = checkWinner()
    if (winner) {
      //TODO : ajouter un usestate indiquant qu'on ne peut plus jouer
      setTimeout(() => {
        alert(`Player ${winner} won!`)
      }, 500)
    }
  }, [grid])

  return (
    <Grid nbRows={NB_ROWS} nbColumns={NB_COLUMNS} currentGrid={grid} onMove={handleMove}></Grid>
  )
}

export default Game