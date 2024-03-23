import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from './App'
import Menu from './menu/Menu'
import Game from './game/components/Game'

describe('Tous les tests', () => {
  test('Title is displayed', () => {
    const {getByText} = render(<App/>)
    const linkElement = getByText(/Puissance 4/i)
    expect(linkElement).toBeInTheDocument()
  })

  describe('Menu tests', () => {
    test('Menu affiche les champs pour les pseudos', () => {
      const handleStartGame = jest.fn()
      const {getByPlaceholderText} = render(<Menu onStartGame={handleStartGame}/>)
      const input1 = getByPlaceholderText('Pseudo joueur 1')
      const input2 = getByPlaceholderText('Pseudo joueur 2')
      fireEvent.change(input1, {target: {value: 'Player 1'}})
      fireEvent.change(input2, {target: {value: 'Player 2'}})
      expect(input1.value).toBe('Player 1')
      expect(input2.value).toBe('Player 2')
    })
  })

  describe('Game tests', () => {
    test('Game affiche le tour du joueur 1', () => {
      const {getByText} = render(<Game player1="Player 1" player2="Player 2"/>)
      const playerTurn = getByText("C'est au tour de Player 1")
      expect(playerTurn).toBeInTheDocument()
    })
  })
})