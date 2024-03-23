import React from 'react'
import Cell from "./Cell";

interface GridProps {
  nbColumns: number
  nbRows: number
  currentGrid: Array<Array<string>>
  onMove: (columnIndex: number) => void
}

const Grid = (props: GridProps) => {

  const {currentGrid, onMove, nbRows, nbColumns } = props

  return (
    <div className="grid">
      {Array.from({ length: nbColumns }).map((_, columnIndex) => (
        <div onClick={() => onMove(columnIndex)} key={columnIndex} className="column">
          {Array.from({ length: nbRows }).map((_, rowIndex) => (
            <Cell key={rowIndex} filledWith={currentGrid[columnIndex]?.[rowIndex]} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Grid