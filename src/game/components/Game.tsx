import React, {useEffect} from 'react'
import Grid from "./Grid";
import InfoLabel from "./InfoLabel";
import {checkWinner} from "../utils/checkWinner";

interface GameProps {
  player1: string
  player2: string
}

const Game = (props: GameProps) => {

  const {player1, player2} = props

  const NB_COLUMNS = 7;
  const NB_ROWS = 6;

  const [winner, setWinner] = React.useState('')
  const [grid, setGrid] = React.useState<Array<Array<string>>>(Array.from({ length: NB_COLUMNS }, () => []))
  const [currentPlayer, setCurrentPlayer] = React.useState<string>('red')

  const isColumnFull = (columnIndex: number) => {
    return grid[columnIndex].length >= NB_ROWS
  }

  const handleMove = (columnIndex: number) => {
    console.log(grid)
    if (winner === '') {
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
  }

  useEffect(() => {
    const win = checkWinner(grid)
    if (win) {
      const gagnant = currentPlayer === 'red' ? player2 : player1
      setWinner(gagnant)
    }
  }, [grid])

  return (
    <div>
      <Grid nbRows={NB_ROWS} nbColumns={NB_COLUMNS} currentGrid={grid} onMove={handleMove}></Grid>
      <InfoLabel currentPlayer={currentPlayer === 'red' ? player1 : player2} winner={winner !== '' ? winner : null} />
    </div>
  )
}

export default Game