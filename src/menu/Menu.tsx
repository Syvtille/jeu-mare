import React, {useState} from 'react'

interface MenuProps {
  onStartGame: (player1: string, player2: string) => void
}

const Menu = (props: MenuProps) => {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  const handleStartGame = () => {
    //on vérifie que les pseudos sont renseignés avant de lancer la partie
    if (!player1 || !player2) {
      alert('Veuillez renseigner les pseudos des joueurs')
      return
    }
    else {
      props.onStartGame(player1, player2)
    }
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