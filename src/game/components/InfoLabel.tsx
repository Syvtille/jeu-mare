import React from 'react'

interface InfoLabelProps {
  currentPlayer: string
  winner: string | null
}

const InfoLabel = (props: InfoLabelProps) => {

  return (
    <div className="info-label">
      {props.winner && <div className="winner">{props.winner} a gagné !</div>}
      {!props.winner && <div>C'est au tour de {props.currentPlayer}</div>}
    </div>
  )
}

export default InfoLabel;