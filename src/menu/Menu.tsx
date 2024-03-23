import React, {useState} from 'react'

interface MenuProps {
  onStartGame: (player1: string, player2: string) => void
}

const Menu = (props: MenuProps) => {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  const handleStartGame = () => {
    console.log('Start game with players', player1, player2)
  }

  return (
    <div className="menu">
      <input
        type="text"
        placeholder="Pseudo joueur 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Pseudo joueur 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button onClick={handleStartGame}>Lancer la partie</button>
    </div>
  )
}

export default Menu