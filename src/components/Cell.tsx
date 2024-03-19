import React from 'react'

interface CellProps {
  filledWith?: string
}

const Cell = (props: CellProps) => {
  const { filledWith } = props

  return (
    <div className={"border-cell"}>
      {filledWith && <div className={`cell ${filledWith}`}></div>}
    </div>
  )
}

export default Cell