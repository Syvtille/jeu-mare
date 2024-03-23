import React, {useState} from 'react';
import './App.css';
import Menu from "./menu/Menu";
import Game from "./game/components/Game";

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (player1: string, player2: string) => {
    setPlayer1(player1);
    setPlayer2(player2);
    setGameStarted(true);
  }

  return (
    <div className="App">
        <h1>Puissance 4</h1>
        {!gameStarted && <Menu onStartGame={handleStartGame} />}
        {gameStarted && <Game player1={player1} player2={player2}/>}
    </div>
  );
}

export default App;
