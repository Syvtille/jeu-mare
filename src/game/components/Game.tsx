import React, {useEffect} from 'react'
import Grid from "./Grid";
import InfoLabel from "./InfoLabel";
import {checkWinner} from "../utils/checkWinner";
import {handleMove} from "../utils/handleMove";

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

  const onMove = (columnIndex: number) => {
    if (winner === '') {
      if (isColumnFull(columnIndex)) return

      if (currentPlayer) {
        const newGrid = handleMove(grid, currentPlayer, columnIndex);
        setGrid(newGrid)
        setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red')
      }
    }
  }

  useEffect(() => {
    const gagnant = checkWinner(grid)
    if (gagnant) {
      setWinner(gagnant === 'red' ? player1 : player2)
    }
  }, [currentPlayer, grid, player1, player2])

  return (
    <div>
      <Grid nbRows={NB_ROWS} nbColumns={NB_COLUMNS} currentGrid={grid} onMove={onMove}></Grid>
      <InfoLabel currentPlayer={currentPlayer === 'red' ? player1 : player2} winner={winner !== '' ? winner : null} />
    </div>
  )
}

export default Game